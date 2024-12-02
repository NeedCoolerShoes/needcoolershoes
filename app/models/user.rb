class User < ApplicationRecord
  require "zip"

  include OtpAuthenticatable
  attr_writer :login

  YEAR_KARMA = 50
  FAVOURITE_RATIO = 0.02
  FAVOURITE_MAX = 25
  PIXEL_CACHE = 5.minutes
  ROLES = %i[moderator admin owner]

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable, :trackable

  belongs_to :featured_skin, class_name: "Skin", foreign_key: "featured_skin_id", optional: true
  belongs_to :featured_badge, class_name: "Badge", foreign_key: "featured_badge_id", optional: true

  has_many :skins, dependent: :destroy
  has_many :banners, dependent: :destroy
  has_many :user_badges, dependent: :destroy
  has_many :badges, through: :user_badges
  has_many :favourites, dependent: :destroy
  has_many :skin_favourites, through: :skins, source: :favourites
  has_many :modlogs, as: :target, dependent: :destroy

  validates :name,
    format: {with: /\A[a-z0-9\-_]+\z/, message: "only allows letters, numbers, dashes and underscores"},
    exclusion: {in: %w[sign_in sign_out password cancel sign_up edit current otp], message: "%{value} is reserved"},
    uniqueness: true,
    length: {maximum: 64}

  validates :email, uniqueness: true, format: {with: URI::MailTo::EMAIL_REGEXP}, length: {maximum: 256}
  validates :attribution_message, length: {maximum: 64}, format: {with: /\A[ -~]+\z/}
  validates :biography, length: {maximum: 2048}

  scope :order_by_pixels, ->(order = :desc) { order(pixels: order) }
  scope :with_login, ->(login) { where(["lower(name) = :value OR lower(email) = :value", { :value => login.downcase }]) }

  enum :role, ROLES

  ROLES.each_with_index do |role, level|
    define_method :"#{role}?" do
      permission_level >= level
    end
  end

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if (login = conditions.delete(:login))
      where(conditions.to_h).with_login(login.downcase).first
    elsif conditions.has_key?(:name) || conditions.has_key?(:email)
      where(conditions.to_h).first
    end
  end

  def attribution_message
    read_attribute(:attribution_message) || name[..64]
  end

  def authorized?(role)
    return false unless User::ROLES.include?(role)
    level = User::ROLES.index(role)
    permission_level >= level
  end

  def permission_level
    return -1 unless role.is_a? String
    ROLES.find_index(role.to_sym)
  end

  def can_user_edit?(some_user)
    return false unless some_user.is_a? User
    return true if some_user.moderator?
    return true if some_user.id == id
    false
  end

  def pixels!
    if PIXEL_CACHE > (Time.current - pixels_cached_at)
      return pixels
    end
    update_pixel_count!
  end

  def update_pixel_count!
    new_count = pixel_count
    update!(pixels: new_count, pixels_cached_at: Time.current)
    new_count
  end

  def featured_skin_data
    return featured_skin.data if featured_skin.present? && featured_skin.visible
    return skins.visible.last.data if skins.visible.any?
    "/ncsassets/img/mncs_mascot_skin.png"
  end

  def banned?
    return false unless ban_ends_at.present?
    ban_ends_at > Time.current
  end

  def to_param
    name
  end

  def pixel_count
    count = badges.sum("badges.karma")
    count += skins.is_public.count * Skin::KARMA
    count += (Time.now.year - created_at.year) * YEAR_KARMA
    count += skin_favourites.where(target_id: Skin.is_public).sum("favourites.karma")
    count.clamp(0..)
  end

  def favourite_grant
    count = update_pixel_count!
    x = (count * FAVOURITE_RATIO)
    (Math.log(x + 1, 2) * 3).round
  end

  def export_skins_to_zip
    Skin.export_to_zip(skins)
  end

  def to_path
    "/@#{name}"
  end

  def to_url
    Routing.root_url + "@#{name}"
  end

  def login
    @login || self.name || self.email
  end
end
