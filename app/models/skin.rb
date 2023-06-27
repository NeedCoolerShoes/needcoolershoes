class Skin < ApplicationRecord
  PARAMS = {
    user: "by_user_name",
    part: "by_part_name",
    category: "by_category_name",
    model: "by_model",
    date_offset: "created_after_days",
    tag: "tagged_with",
    favourited_by: "favourited_by_user_name",
    search: "search"
  }
  KARMA = 5
  include PgSearch::Model
  pg_search_scope :search, against: :name, using: {tsearch: {prefix: true}}, associated_against: {tags: :name}

  belongs_to :user
  belongs_to :skin_category
  belongs_to :skin_part
  has_many :favourites

  enum :visibility, %i[is_public is_unlisted is_private], default: :is_public
  enum :model, %i[classic slim], default: :classic
  
  validates :name, :skin_category, :skin_part, :visibility, :model, presence: true
  validates :terms_and_conditions, acceptance: true

  scope :by_user_name, ->(name) { includes(:user).where(user: { name: name } ) }
  scope :order_by_updated, -> { order(updated_at: :desc) }
  scope :order_by_created, -> { order(created_at: :desc) }
  scope :visible_to_user, ->(user) { is_public.or(where(user: user)) }
  scope :by_part_name, ->(name) { includes(:skin_part).where(skin_part: { name: name }) }
  scope :by_category_name, ->(name) { includes(:skin_category).where(skin_category: { name: name }) }
  scope :by_model, ->(model) { where(model: model) }
  scope :created_after_days, ->(count) { where(created_at: (Date.today - count.to_i.days)..) }
  scope :favourited_by_user_name, ->(name) { includes(:favourites).where(favourites: { user: User.where(name: name) }) }

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
  end

  acts_as_taggable_on :tags

  def can_user_edit?(some_user)
    return true if is_public?
    return false unless some_user.present?
    return true if some_user.id == user_id
    false
  end

  def tag_js
    tags.map { |tag| {value: tag.name} }.to_json
  end

  def favourited_by?(user)
    favourites.where(user: user).any?
  end

  private

  def send_creation_webhook
    Discord::NewSkinWebhook.send_webhook(self)
  rescue
    nil
  end
end
