class Favourite < ApplicationRecord
  belongs_to :user
  belongs_to :target, polymorphic: true, counter_cache: true

  attribute :karma, :integer, default: 0

  before_create :set_karma_from_user

  validates :target_id, uniqueness: {scope: %i[target_type user_id]}

  scope :not_by_user, ->(user) { where.not(user: user) }

  private

  def set_karma_from_user
    return unless user.present? && target.present?
    return if target.user_id == user_id
    self.karma = user.favourite_grant
  end
end
