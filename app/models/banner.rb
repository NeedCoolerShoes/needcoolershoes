class Banner < ApplicationRecord
  include PgSearch::Model
  include Favouriteable
  include GalleryFilters
  include Taggable
  include Searchable

  SURVIVAL_FRIENDLY_LENGTH = 14

  add_gallery_filters({
    tag: "tagged_with_cached",
    favourited_by: "favourited_by_user_name",
    search: "search",
    compatibility: "by_compatibility",
    style: "by_style",
  })

  attribute :terms_and_conditions, :boolean

  validates :name, :data, presence: true
  validates :data, uniqueness: true, format: {with: /\A[a-z]a([a-z]{2})+\z/i, message: "only allows valid banner codes"}
  validates :name, length: {maximum: 128}
  validates :description, length: {maximum: 1024}
  validates :terms_and_conditions, acceptance: true

  belongs_to :user
  has_many :modlogs, as: :target

  scope :hidden, -> { where(hidden: true) }
  scope :visible, -> { where.not(hidden: true) }
  scope :banner_compatible, -> { banner_style.or(any_style) }
  scope :shield_compatible, -> { shield_style.or(any_style) }
  scope :by_style, ->(style) {
    case style
    when "banner" then banner_compatible
    when "shield" then shield_compatible
    else all
    end
  }

  enum :style, %i[banner any shield], default: :banner, suffix: :style

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

  def to_url_title
    "~#{name.parameterize.tr("_", "-")}"
  end

  def to_title_path
    Routing.banner_title_path(self, to_url_title)
  end

  def to_title_url
    Routing.banner_title_url(self, to_url_title)
  end
end
