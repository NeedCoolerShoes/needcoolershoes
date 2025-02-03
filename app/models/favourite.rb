class Favourite < ApplicationRecord
  belongs_to :user
  belongs_to :target, polymorphic: true, counter_cache: true

  attribute :karma, :integer, default: 0

  before_create :set_karma_from_user
  after_create :update_target_rank

  validates :target_id, uniqueness: {scope: %i[target_type user_id]}

  scope :not_by_user, ->(user) { where.not(user: user) }

  private

  def set_karma_from_user
    return unless user.present? && target.present?
    return if target.user_id == user_id
    self.karma = user.favourite_grant
  end

  def update_target_rank
    raise "Missing Sortable by Hot!" unless target.respond_to?(:update_ranking!)
    target.update_ranking!
  end
end
