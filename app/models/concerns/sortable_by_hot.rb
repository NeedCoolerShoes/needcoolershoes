RANK_WINDOW_DAYS = 14
ATTRIBUTIONS_KARMA = 1.5

module SortableByHot
  def self.[](kwargs)
    Module.new do
      extend ActiveSupport::Concern

      included do
        mattr_reader :karma_scale, default: kwargs[:karma] || 0
        mattr_reader :favourites_scale, default: kwargs[:favourites] || 0

        unless include?(Favouriteable)
          raise "Cannot sort by hot without favourites!"
        end

        scope :order_by_hotness, -> { order(rank: :desc, id: :desc) }
        after_create :update_ranking!

        def self.calculate_rankings!
          find_each do |record|
            record.update_ranking!
          end
        end
      end

      def calculate_hotness_score
        score = favourites.sum(:karma) * karma_scale
        score += favourites.not_by_user(user).count * favourites_scale

        if respond_to?(:variants)
          score += variants.not_by_user(user).count * ATTRIBUTIONS_KARMA
        end

        Math.log(score + 1).round(3)
      end

      # https://herman.bearblog.dev/a-better-ranking-algorithm/
      def update_ranking!
        ranking = calculate_hotness_score + (created_at.to_i / (RANK_WINDOW_DAYS * 8600))

        update_column(:rank, ranking.ceil)
      end

      def rank_debug
        base = (created_at.to_i / (RANK_WINDOW_DAYS * 8600))
        score = calculate_hotness_score
        fav_karma = favourites.not_by_user(user).sum(:karma)
        fav_count = favourites.not_by_user(user).count

        out = ["Rank: #{rank} (#{base} + #{score})"]
        out << "Day: #{created_at.to_i / 8600}"
        out << "Favourites Karma: #{fav_karma * karma_scale} (#{fav_karma} x #{karma_scale})"
        out << "Favourites Count: #{fav_count * favourites_scale} (#{fav_count} x #{favourites_scale})"

        if respond_to?(:variants)
          attr_count = variants.not_by_user(user).count
          karma = ATTRIBUTIONS_KARMA
          out << "Attributions Karma: #{attr_count * karma} (#{attr_count} x #{karma})"
        end

        out.join("\n")
      end
    end
  end
end