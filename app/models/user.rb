class User < ApplicationRecord
  require 'zip'

  include OtpAuthenticatable

  YEAR_KARMA = 50
  FAVOURITE_RATIO = 0.02
  FAVOURITE_MAX = 25
  PIXEL_CACHE = 5.minutes
  ROLES = %i[moderator admin owner]

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable
  
  before_validation :setup_username, unless: :id?

  belongs_to :featured_skin, class_name: "Skin", foreign_key: "featured_skin_id", optional: true
  has_many :skins
  has_many :user_badges
  has_many :badges, through: :user_badges
  has_many :favourites
  has_many :skin_favourites, through: :skins, source: :favourites
  has_many :minecraft_accounts

  validates :name,
    format: { with: /\A[a-z0-9\-_]+\z/, message: "only allows letters, numbers, dashes and underscores" },
    exclusion: { in: %w(sign_in sign_out password cancel sign_up edit current otp), message: "%{value} is reserved" },
    uniqueness: true
  
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :attribution_message, length: { maximum: 64 }, format: { with: /\A[ -~]+\z/ }
  
  enum :role, ROLES
  
  ROLES.each_with_index do |role, level|
    define_method :"#{role}?" do
      permission_level >= level
    end
  end

  def attribution_message
    read_attribute(:attribution_message) || name[..64]
  end
  
  def permission_level
    return -1 unless role.is_a? String
    ROLES.find_index(role.to_sym)
  end

  def can_user_edit?(some_user)
    return false unless some_user.is_a? User
    return true if some_user.admin?
    return true if some_user.id == id
    false
  end

  def pixels
    if @pixels
      return @pixels[:count] unless @pixels[:expires] < Time.now
    end
    @pixels = { count: pixel_count, expires: (Time.now + PIXEL_CACHE) }
    @pixels[:count]
  end

  def featured_skin_data
    return featured_skin.data if featured_skin.present?
    return skins.last.data if skins.any?
    "/ncsassets/img/mncs_mascot_skin.png"
  end
  
  def to_param
    name
  end

  def pixel_count
    count = badges.sum("badges.karma")
    count += skins.is_public.count * Skin::KARMA
    count += (Time.now.year - created_at.year) * YEAR_KARMA
    count += skin_favourites.is_public.sum("favourites.karma")
    count.clamp(0..)
  end

  def favourite_grant(count = pixel_count)
    x = (count * FAVOURITE_RATIO)
    (Math.log(x + 1, 2) * 3).round
  end

  def export_skins_to_zip
    Skin.export_to_zip(skins)
  end

  private

  def setup_username
    return errors.add(:name, :invalid, message: "may not be an email") if self.name.include? "@"
    self.display_name = self.name
    self.name = self.name.to_s.parameterize
  end
end
