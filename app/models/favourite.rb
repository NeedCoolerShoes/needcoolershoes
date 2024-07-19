class Favourite < ApplicationRecord
  belongs_to :user
  belongs_to :target, polymorphic: true, counter_cache: true

  before_create :set_karma_from_user

  validates :skin, uniqueness: {scope: :user}

  scope :not_by_user, ->(user) { where.not(user: user) }
  
  private

  def set_karma_from_user
    return unless user.present? && skin.present?
    self.karma = skin.user_id == user_id ? 0 : user.favourite_grant
  end
end
