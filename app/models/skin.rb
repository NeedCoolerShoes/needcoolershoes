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
  include PgSearch::Model
  delegate :url_helpers, to: 'Rails.application.routes'

  pg_search_scope :search, against: :name, using: {tsearch: {prefix: true}}, associated_against: {tags: :name}

  belongs_to :user
  belongs_to :skin_category
  belongs_to :skin_part
  has_many :favourites, dependent: :destroy

  enum :visibility, %i[is_public is_unlisted is_private], default: :is_public
  enum :model, %i[classic slim], default: :classic
  
  validates :name, :skin_category, :skin_part, :visibility, :model, :data, presence: true
  validates :terms_and_conditions, acceptance: true
  validates :data, uniqueness: true

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
    return false unless some_user.present?
    return true if some_user.id == user_id
    false
  end

  def can_user_edit?(some_user)
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

  def to_png
    raise "Skin has invalid data!" unless data.start_with? "data:image/png;base64,"
    Base64.decode64(data.delete_prefix("data:image/png;base64,"))
  end

  def filename
    "#{name.parameterize}_#{created_at.strftime("%Y%m%d")}_#{id}.png"
  end

  def metadata
    {
      file: filename,
      name: name, description: description,author: "#{user.display_name} (#{user.name})",
      url: router.skin_url(self), created_at: created_at, updated_at: updated_at, tags: tag_list
    }
  end

  private

  def send_creation_webhook
    Discord::NewSkinWebhook.send_webhook(self)
  rescue
    nil
  end
end
