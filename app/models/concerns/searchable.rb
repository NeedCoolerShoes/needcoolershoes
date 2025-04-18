require "redcarpet/render_strip"
module Searchable
  extend ActiveSupport::Concern

  included do
    pg_search_scope :search, against: :search_cache, using: {tsearch: {prefix: true}}

    after_save :save_search_cache!
  end

  def save_search_cache!
    reload

    cache = []
    cache << name.to_s[..64]

    if tag_cache?
      cache << cached_tags.pluck(:name).join(" ")[..256]
    end

    markdown = Redcarpet::Markdown.new(Redcarpet::Render::StripDown)
    cache << markdown.render(description.to_s)[..256]

    cache_str = cache.join(" ").tr("\n", " ").squeeze(" ").strip

    return if cache_str == search_cache
    
    update_column(:search_cache, cache_str)
  end
end
