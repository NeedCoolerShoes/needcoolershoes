class UserBadge < ApplicationRecord
  belongs_to :user
  belongs_to :badge

  validates :badge, uniqueness: { scope: :user }
end
