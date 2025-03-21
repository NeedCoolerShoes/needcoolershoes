module Favouriteable
  extend ActiveSupport::Concern

  included do
    has_many :favourites, as: :target, dependent: :destroy
    scope :favourited_by_user_name, ->(name) { joins(:favourites).where(favourites: {user: User.where(name: name)}) }
  end

  def favourited_by?(user)
    favourites.where(user: user).any?
  end
end