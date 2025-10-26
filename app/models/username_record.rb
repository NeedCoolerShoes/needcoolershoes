class UsernameRecord < ApplicationRecord
  belongs_to :user, optional: true

  scope :with_name, ->(name) { where(name: name) }
  scope :with_user, ->(user) { where(user: user) }
  scope :banned, -> { where(banned: true) }
  scope :allowed, -> { where.not(banned: true) }
  scope :order_created, ->(dir = :desc) { order(created_at: dir) }
  
  def self.from_user(user)
    new(name: user.name, user: user)
  end

  def self.latest_by_name(name)
    allowed.with_name(name).order_created.first
  end
end
