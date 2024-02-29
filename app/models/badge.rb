class Badge < ApplicationRecord
  has_many :user_badges
  
  validates :name, :url, :karma, presence: true

  scope :with_user_badges, -> { includes(:user_badges).where.not(user_badges: {id: nil}) }
end
