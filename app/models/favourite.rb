class Favourite < ApplicationRecord
  belongs_to :user
  belongs_to :skin

  before_create :set_karma_from_user

  validates :skin, uniqueness: { scope: :user }

  private

  def set_karma_from_user
    puts "setting karma"
    return unless user.present? && skin.present?
    puts "found user and skin"
    self.karma = (skin.user_id == user_id) ? 0 : user.favourite_grant
  end
end
