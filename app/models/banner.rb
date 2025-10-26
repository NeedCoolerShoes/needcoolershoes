class Banner < ApplicationRecord
  include PgSearch::Model
  include Favouriteable
  include GalleryFilters
  include Taggable
  include Searchable

  include SortableByHot[karma: 0, favourites: 2.5]

  SURVIVAL_FRIENDLY_LENGTH = 14

  add_gallery_filters({
    tag: "tagged_with_cached",
    favourited_by: "favourited_by_user_name",
    search: "search",
    compatibility: "by_compatibility",
    style: "by_style",
    max_version: "by_version",
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

  attribute :style, :integer, default: 0
  enum :style, %i[banner any shield], default: :banner, suffix: :style
  attribute :minimum_version, :integer, default: 0
  enum :minimum_version, %i[v1_8 v1_16 v1_21], default: :v1_8

  scope :survival_friendly, -> { where("LENGTH(data) <= ?", SURVIVAL_FRIENDLY_LENGTH) }
  scope :by_compatibility, ->(type) {
    case type
    when "survival" then survival_friendly
    when "command" then where.not(id: survival_friendly)
    end
  }

  scope :by_version, ->(version) {
    minimum_version = minimum_versions[version]
    return all unless minimum_version.present?

    where(minimum_version: ..minimum_version)
  }

  def self.latest_mc_version
    self.minimum_versions.keys.last
  end

  def self.format_mc_version_name(version)
    versions = {
      "v1_8" => "1.8+",
      "v1_16" => "1.16+",
      "v1_21" => "1.21+",
    }
    return versions[version] || "???"
  end

  def self.format_mc_version_range(version)
    versions = {
      "v1_8" => "1.8 - 1.15",
      "v1_16" => "1.16 - 1.20",
      "v1_21" => "1.21+",
    }
    return versions[version] || "???"
  end

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

  def formatted_minimum_version
    self.class.format_mc_version_name(minimum_version)
  end

  def calculate_minimum_version
    return unless data.match?(/\A[a-p]a([a-z]{2})+\z/i)
    return :v1_21 if data.match?(/\A([a-zA-Z][a-zA-Z])*([a-p][PQ])([a-zA-Z][a-zA-Z])*\z/)
    return :v1_16 if data.match?(/\A([a-zA-Z][a-zA-Z])*([a-p][NO])([a-zA-Z][a-zA-Z])*\z/)
    :v1_8
  end
end
