class Skin < ApplicationRecord
  PARAMS = {
    user: "by_user_name",
    part: "by_part_name",
    category: "by_category_name",
    model: "by_model",
    date_offset: "created_after_days",
    tag: "tagged_with",
    favourited_by: "favourited_by_user_name",
    search: "search",
    order: "ordered_by"
  }
  KARMA = 5
  PREVIEW_CACHE_PATH = Pathname(Dir.tmpdir + "/ncrs-cache/previews")

  include PgSearch::Model
  include SkinTransformations
  include Routing

  delegate :url_helpers, to: 'Rails.application.routes'

  pg_search_scope :search, against: :name, using: {tsearch: {prefix: true}}, associated_against: {tags: :name}

  belongs_to :user
  belongs_to :skin_category
  belongs_to :skin_part
  has_many :favourites, dependent: :destroy
  has_many :attributions, class_name: "SkinAttribution", dependent: :destroy
  has_many :variants, class_name: "SkinAttribution", foreign_key: "attributed_skin_id", dependent: :nullify

  enum :visibility, %i[is_public is_unlisted is_private], default: :is_public
  enum :model, %i[classic slim], default: :classic
  
  validates :name, :skin_category, :skin_part, :visibility, :model, :data, presence: true
  validates :name, length: { maximum: 128 }
  validates :description, length: { maximum: 1024 }
  validates :terms_and_conditions, acceptance: true

  attribute :favourites_count, :integer, default: 0

  scope :by_user_name, ->(name) { joins(:user).where(user: { name: name } ) }
  scope :order_by_updated, ->(direction = :desc) { order(updated_at: direction) }
  scope :order_by_created, ->(direction = :desc) { order(created_at: direction) }
  scope :order_by_favourites, ->(direction = :desc) { order(favourites_count: direction) }
  scope :visible_to_user, ->(user) { is_public.or(where(user: user)) }
  scope :by_part_name, ->(name) { joins(:skin_part).where(skin_part: { name: name }) }
  scope :by_category_name, ->(name) { joins(:skin_category).where(skin_category: { name: name }) }
  scope :by_model, ->(model) { where(model: model) }
  scope :created_after_days, ->(count) { where(created_at: (Date.today - count.to_i.days)..) }
  scope :favourited_by_user_name, ->(name) { joins(:favourites).where(favourites: { user: User.where(name: name) }) }
  
  scope :ordered_by, ->(ordering) {
    case ordering
    when 'favourite' then order_by_favourites
    when 'old' then order_by_created(:asc)
    when 'new_updated' then order_by_updated
    when 'old_updated' then order_by_updated(:asc)
    when 'random' then order('RANDOM()')
    else order_by_created
    end
  }

  scope :with_params, ->(params) { with_params_query(params) }

  after_create :send_creation_webhook, if: :is_public?
  after_create :embed_watermark!, unless: -> { user.watermark_disabled? }
  
  class << self
    def with_params_query(params)
      query = all
      params.each do |key, value|
        next unless PARAMS.include? key.to_sym
        query = query.merge(send(PARAMS[key.to_sym], value))
      end
      query
    end

    def export_to_zip(skins = all)
      zip_file = Tempfile.new
      metadata_file = Tempfile.new
      metadata_file.open
      files = []
      Zip::File.open(zip_file.path, Zip::File::CREATE) do |zip|
        skins.each do |skin|
          file = Tempfile.new
          files << file
          File.open(file, 'wb') { |file| file.write(skin.to_png) }
          File.open(metadata_file, 'a') { |file| file.write(skin.metadata.to_json + "\n") }
          zip.add(skin.filename, file.path)
        end
        zip.add("metadata.jsonl", metadata_file.path)
      end
      files.each { |f| f.unlink }
      metadata_file.unlink
      zip_file
    end
  end

  acts_as_taggable_on :tags

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

  def tag_js
    tags.map { |tag| {value: tag.name} }.to_json
  end

  def favourited_by?(user)
    favourites.where(user: user).any?
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

  def preview_img
    PREVIEW_CACHE_PATH.mkpath unless PREVIEW_CACHE_PATH.exist?
    path = PREVIEW_CACHE_PATH.join(filename)
    return path.read if path.exist?
    img_data = to_preview_img.to_datastream
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
      created_at: created_at, updated_at: updated_at, tags: tag_list
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
    region.to_rgb_stream.tr("\u0000", '').split("\n")
  end

  private

  def send_creation_webhook
    Discord::NewSkinWebhook.send_webhook(self)
  rescue
    nil
  end

  def cache_image_file(img_path, data)
    img_path.open('wb') { |file| file << data }
  end
end
