module GalleryFilters
  extend ActiveSupport::Concern

  included do
    scope :by_user_name, ->(name) { joins(:user).where(user: {name: name}) }
    scope :order_by_updated, ->(direction = :desc) { order(updated_at: direction) }
    scope :order_by_created, ->(direction = :desc) { order(created_at: direction) }
    scope :order_by_favourites, ->(direction = :desc) { order(favourites_count: direction) }
    scope :created_after_days, ->(count) { where(created_at: (Date.today - count.to_i.days)..) }
    scope :with_params, ->(params) { with_params_query(params) }

    scope :order_by_random_seed, ->(seed) {
      ApplicationRecord.connection.execute("SELECT SETSEED(#{seed.to_f})")
      order("RANDOM()")
    }

    scope :ordered_by, ->(ordering) {
      case ordering
      when "favourite" then order_by_favourites
      when "old" then order_by_created(:asc)
      when "new_updated" then order_by_updated
      when "old_updated" then order_by_updated(:asc)
      when "random" then order("RANDOM()")
      when /random:([a-zA-Z0-9_\-]+)/
        begin
          float = Base64.urlsafe_decode64($1.to_s).unpack('f').first
        rescue
          float = false
        end
        float.is_a?(Float) ? order_by_random_seed(float) : order("RANDOM()")
      else order_by_created
      end
    }
  end

  class_methods do
    def gallery_filters
      @@filters ||= {
        user: "by_user_name",
        date_offset: "created_after_days",
        order: "ordered_by"
      }
    end

    def add_gallery_filters(filters)
      gallery_filters.merge!(filters)
    end

    def with_params_query(params)
      query = all
      params.each do |key, value|
        symkey = key.to_sym
        next unless gallery_filters.include? symkey
        query = query.merge(send(gallery_filters[symkey], value))
      end
      query
    end
  end
end