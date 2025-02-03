module SortableByHot
  TIME_DIVISOR = 3600
  ATTRIBUTIONS_KARMA = 1.5

  extend ActiveSupport::Concern

  included do
    unless include?(Favouriteable)
      raise "Cannot sort by hot without favourites!"
    end
    unless has_attribute?(:rank)
      raise "Cannot sort by hot without rank!"
    end
    unless const_defined?(:KARMA_MULT) || const_defined?(:FAVOURITES_MULT)
      raise "Missing constants for class"
    end

    scope :order_by_hotness, -> { order(rank: :desc, id: :desc) }
    after_create :update_ranking!

    def self.calculate_rankings!
      find_each do |record|
        record.update_ranking!
      end
    end
  end

  def update_ranking!
    ranking = created_at.to_i / TIME_DIVISOR
    ranking += favourites.sum(:karma) * KARMA_MULT
    ranking += favourites.not_by_user(user).count * FAVOURITES_MULT

    if respond_to?(:variants)
      ranking += variants.not_by_user(user).count * ATTRIBUTIONS_KARMA
    end

    update_column(:rank, ranking.ceil)
  end

  def rank_debug
    base = created_at.to_i / TIME_DIVISOR
    fav_karma = favourites.not_by_user(user).sum(:karma)
    fav_count = favourites.not_by_user(user).count

    out = ["Rank: #{rank} (#{base} + #{rank - base})"]
    out << "Favourites Karma: #{fav_karma * KARMA_MULT} (#{fav_karma} x #{KARMA_MULT})"
    out << "Favourites Count: #{fav_count * FAVOURITES_MULT} (#{fav_count} x #{FAVOURITES_MULT})"

    if respond_to?(:variants)
      attr_count = variants.not_by_user(user).count
      karma = ATTRIBUTIONS_KARMA
      out << "Attributions Karma: #{attr_count * karma} (#{attr_count} x #{karma})"
    end

    out.join("\n")
  end
end