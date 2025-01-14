module Taggable
  extend ActiveSupport::Concern

  included do
    if !has_attribute?(:tag_cache) && !ActiveRecord::Base.connection.migration_context.needs_migration?
      raise "Cannot include tags without a tag cache!"
    end

    acts_as_taggable_on :tags

    after_save :save_cached_tags!

    scope :tagged_with_cached, ->(tags) {
      list = ActsAsTaggableOn::DefaultParser.new(tags).parse
      tags = ActsAsTaggableOn::Tag.named_any(list)

      return none if list.size != tags.count || tags.count < 1
  
      where("tag_cache @> ARRAY[?]", tags.pluck(:id))
    }
  end

  def save_cached_tags!
    reload
    update_column(:tag_cache, tags.pluck(:id))
  end
end
