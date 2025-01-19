class Skin < ApplicationRecord
  PARAMS = {
    part: "by_part_name",
    category: "by_category_name",
    model: "by_model",
    tag: "tagged_with_cached",
    favourited_by: "favourited_by_user_name",
    search: "search",
  }
  LICENSES = {
    cc0: "CC0 1.0",
    cc_by_sa_4: "CC-BY-SA 4.0",
    mncs: "MNCS Terms",
    arr: "All Rights Reserved"
  }
  CREATOR = {
    self: "I made this skin.",
    archive: "I archived it from the old site (needcoolshoes.com).",
    arr: "The skin is copyrighted (All Rights Reserved)."
  }
  SKINVIEW_MODEL = {"classic" => "default", "slim" => "slim"}

  KARMA = 5
  PREVIEW_CACHE_PATH = Pathname(Dir.tmpdir + "/ncrs-cache/previews")
  SOCIAL_CACHE_PATH = Pathname(Dir.tmpdir + "/ncrs-cache/social-cards")

  include PgSearch::Model
  include SkinTransformations
  include Routing
  include Favouriteable
  include GalleryFilters
  include Taggable

  add_gallery_filters PARAMS

  delegate :url_helpers, to: "Rails.application.routes"

  pg_search_scope :search, against: :name, using: {tsearch: {prefix: true}}, associated_against: {tags: :name}

  belongs_to :user
  belongs_to :skin_category
  belongs_to :skin_part
  has_many :attributions, class_name: "SkinAttribution", dependent: :destroy
  has_many :variants, class_name: "SkinAttribution", foreign_key: "attributed_skin_id", dependent: :nullify
  has_many :modlogs, as: :target
  
  has_one :featured_by_user, class_name: "User", foreign_key: "featured_skin_id", dependent: :nullify

  enum :visibility, %i[is_public is_unlisted is_private], default: :is_public
  enum :model, %i[classic slim], default: :classic
  enum :license, LICENSES.keys, suffix: true, default: :cc_by_sa_4

  attribute :creator, :string
  enum :creator, CREATOR.keys, prefix: :created_by, default: :self

  attribute :favourites_count, :integer, default: 0

  before_validation :manage_jam_tags, if: :tag_list?

  validates :name, :skin_category, :skin_part, :visibility, :model, :data, presence: true
  validates :name, length: {maximum: 128}
  validates :description, length: {maximum: 1024}
  validates :terms_and_conditions, acceptance: true
  
  # Skin filters
  scope :hidden, -> { where(hidden: true) }
  scope :visible, -> { where.not(hidden: true) }
  scope :visible_to_user, ->(user) { visible.is_public.or(where(user: user)) }
  scope :by_part_name, ->(name) { joins(:skin_part).where(skin_part: {name: name}) }
  scope :by_category_name, ->(name) { joins(:skin_category).where(skin_category: {name: name}) }
  scope :by_model, ->(model) { where(model: model) }

  after_create :send_creation_webhook, if: :is_public?
  after_create :embed_watermark!, unless: -> { user.watermark_disabled? }

  class << self
    def export_to_zip(skins = all)
      zip_file = Tempfile.new
      metadata_file = Tempfile.new
      metadata_file.open
      files = []
      Zip::File.open(zip_file.path, Zip::File::CREATE) do |zip|
        skins.each do |skin|
          file = Tempfile.new
          files << file
          File.binwrite(file, skin.to_png)
          File.open(metadata_file, "a") { |file| file.write(skin.metadata.to_json + "\n") }
          zip.add(skin.filename, file.path)
        end
        zip.add("metadata.jsonl", metadata_file.path)
      end
      files.each { |f| f.unlink }
      metadata_file.unlink
      zip_file
    end
  end

  def can_user_open_in_editor?(some_user)
    return true if is_public?
    return false unless some_user.is_a? User
    return true if some_user.id == user_id
    false
  end

  def can_user_edit?(some_user)
    return false unless some_user.is_a? User
    return true if some_user.moderator?
    return true if some_user.id == user_id
    false
  end

  def visible
    !hidden
  end

  def tag_js
    tags.map { |tag| {value: tag.name} }.to_json
  end

  def url
    skin_url(self)
  end

  def attribution_string(js_safe = false)
    seperator = js_safe ? "\\n" : "\n"
    "#{url}#{seperator}#{user.attribution_message}"
  end

  def to_png
    raise "Skin has invalid data!" unless data.start_with? "data:image/png;base64,"
    Base64.decode64(data.delete_prefix("data:image/png;base64,"))
  end

  def to_img
    ChunkyPNG::Image.from_data_url(data)
  end

  def to_preview_img(scale = 10)
    map_to_image(to_img, *FRONTBACK_MODEL_TO_UV[model.to_sym], size: [36, 32], scale: scale)
  end

  def to_all_sides_img(scale = 10)
    map_to_image(to_img, *ALL_SIDES_MODEL_TO_UV[model.to_sym], size: [60, 32], scale: scale)
  end

  def preview_img
    PREVIEW_CACHE_PATH.mkpath unless PREVIEW_CACHE_PATH.exist?
    path = PREVIEW_CACHE_PATH.join(filename)
    return path.read if path.exist?
    img_data = to_preview_img.to_datastream
    cache_image_file(path, img_data)
    img_data
  end

  def social_img
    SOCIAL_CACHE_PATH.mkpath unless SOCIAL_CACHE_PATH.exist?
    path = SOCIAL_CACHE_PATH.join(filename)
    return path.read if path.exist?
    template_data = ChunkyPNG::Image.from_file("lib/assets/social-preview-#{model}.png")
    img_data = template_data.compose(to_all_sides_img, 90, 20).to_datastream
    cache_image_file(path, img_data)
    img_data
  end

  def filename
    "#{name.parameterize}_#{created_at.strftime("%Y%m%d")}_#{id}.png"
  end

  def metadata
    {
      file: filename,
      name: name, description: description, author: "#{user.display_name} (#{user.name})",
      attribution_message: user.attribution_message, url: skin_url(self),
      created_at: created_at, updated_at: updated_at, tags: tag_list,
      license: LICENSES[(license || :arr).to_sym]
    }
  end

  def embed_watermark!(src = nil)
    img = to_img
    img.replace!(to_watermark_img(src), 0, 0)
    update!(data: img.to_data_url)
  end

  def to_watermark_img(src = nil)
    src ||= skin_url(self) + "\n#{user.attribution_message.present? ? user.attribution_message : user.name}"
    data = src.ljust(192, "\u0000")[..192]
    ChunkyPNG::Image.from_rgb_stream 8, 8, data
  end

  def parse_watermark
    region = to_img.crop(0, 0, 8, 8)
    region.to_rgb_stream.tr("\u0000", "").split("\n")
  end

  def skinview_model
    SKINVIEW_MODEL[model]
  end

  def to_url_title
    "~#{name.to_s.parameterize.tr("_", "-")}"
  end

  def to_title_path
    Routing.skin_title_path(self, to_url_title)
  end

  def to_title_url
    Routing.skin_title_url(self, to_url_title)
  end

  private

  def send_creation_webhook
    Discord::NewSkinWebhook.send_webhook(self)
  rescue
    nil
  end

  def cache_image_file(img_path, data)
    img_path.open("wb") { |file| file << data }
  end

  def manage_jam_tags
    tags = tag_list.to_a - jam_tags.to_a
    jams = SkinJam.where(tag: tags)

    return unless jams.any?

    jams.each do |jam|
      is_valid = true

      if jam.start_at > (self.created_at || Time.current)
        is_valid = false
        errors.add(:tag_list, "skin created before #{jam.name} started")
      end

      if !jam.open?
        is_valid = false
        errors.add(:tag_list, "#{jam.name} is not open for submissions")
      end

      if is_valid
        jam_tags << jam.tag
      end
    end
  end
end