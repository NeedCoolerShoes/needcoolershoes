class User < ApplicationRecord
  YEAR_KARMA = 50
  FAVOURITE_RATIO = 0.02
  FAVOURITE_MAX = 25
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

  validates :name,
    format: { with: /\A[a-z0-9\-_]+\z/, message: "only allows letters, numbers, dashes and underscores" },
    exclusion: { in: %w(current), message: "%{value} is reserved" }

  def featured_skin_data
    return featured_skin.data if featured_skin.present?
    return skins.last.data if skins.any?
    "/ncsassets/img/mncs_mascot_skin.png"
  end
  
  def to_param
    name
  end

  def pixel_count
    count = User.includes(:badges).where(id: id).sum("badges.karma")
    count += skins.is_public.count * Skin::KARMA
    count += (Time.now.year - created_at.year) * YEAR_KARMA
    count < 0 ? 0 : count
  end

  def favourite_grant
    (pixel_count * FAVOURITE_RATIO).floor.clamp(0, FAVOURITE_MAX)
  end

  private

  def setup_username
    self.display_name = self.name
    self.name = self.name.to_s.parameterize
  end
end
