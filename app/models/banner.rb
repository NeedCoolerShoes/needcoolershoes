class Banner < ApplicationRecord
  include PgSearch::Model
  include Favouriteable
  include GalleryFilters

  add_gallery_filters({
    tag: "tagged_with",
    favourited_by: "favourited_by_user_name",
    search: "search",
  })

  acts_as_taggable_on :tags
  pg_search_scope :search, against: :name, using: {tsearch: {prefix: true}}, associated_against: {tags: :name}

  attribute :terms_and_conditions, :boolean

  validates :name, :data, presence: true
  validates :name, length: {maximum: 128}
  validates :description, length: {maximum: 1024}
  validates :terms_and_conditions, acceptance: true

  belongs_to :user
end
