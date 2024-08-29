class Banner < ApplicationRecord
  include PgSearch::Model
  include Favouriteable
  include GalleryFilters

  SURVIVAL_FRIENDLY_LENGTH = 14

  add_gallery_filters({
    tag: "tagged_with",
    favourited_by: "favourited_by_user_name",
    search: "search",
    compatibility: "by_compatibility",
  })

  acts_as_taggable_on :tags
  pg_search_scope :search, against: :name, using: {tsearch: {prefix: true}}, associated_against: {tags: :name}

  attribute :terms_and_conditions, :boolean

  validates :name, :data, presence: true
  validates :data, uniqueness: true, format: {with: /\A[a-z]a([a-z]{2})+\z/i, message: "only allows valid banner codes"}
  validates :name, length: {maximum: 128}
  validates :description, length: {maximum: 1024}
  validates :terms_and_conditions, acceptance: true

  belongs_to :user
  has_many :modlogs, as: :target

  scope :survival_friendly, -> { where("LENGTH(data) <= ?", SURVIVAL_FRIENDLY_LENGTH) }
  scope :by_compatibility, ->(type) {
    case type
    when "survival" then survival_friendly
    when "command" then where.not(id: survival_friendly)
    end
  }

  def survival_friendly?
    data.size <= SURVIVAL_FRIENDLY_LENGTH
  end

  def tag_js
    tags.map { |tag| {value: tag.name} }.to_json
  end

  def can_user_edit?(some_user)
    some_user&.id == user_id
  end
end
