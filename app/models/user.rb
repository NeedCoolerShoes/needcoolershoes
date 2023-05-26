class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable
  
  before_validation :setup_username, unless: :id?

  belongs_to :featured_skin, class_name: "Skin", foreign_key: "featured_skin_id", optional: true
  has_many :skins

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

  private

  def setup_username
    self.display_name = self.name
    self.name = self.name.to_s.parameterize
  end
end
