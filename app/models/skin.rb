class Skin < ApplicationRecord
  belongs_to :user
  belongs_to :skin_category
  belongs_to :skin_part

  enum :visibility, %i[is_public is_unlisted is_private], default: :is_public

  validates :terms_and_conditions, acceptance: true

  scope :by_user_name, ->(name) { includes(:user).where(user: { name: name } ) }
  scope :order_by_updated, -> { order(updated_at: :desc) }
  scope :visible_to_user, ->(user) { is_public.or(where(user: user)) }

  def can_user_edit?(some_user)
    return true if is_public?
    return false unless some_user.present?
    return true if some_user.id == user_id
    false
  end
end
