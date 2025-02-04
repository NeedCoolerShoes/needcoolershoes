class Favourite < ApplicationRecord
  belongs_to :user
  belongs_to :target, polymorphic: true, counter_cache: true

  attribute :karma, :integer, default: 0
  validates :target_id, uniqueness: {scope: %i[target_type user_id]}

  scope :not_by_user, ->(user) { where.not(user: user) }

  def self.add_favourite(user, target)
    favourite = new(target: target, user: user)
    favourite.karma = user.favourite_grant
    result = favourite.save

    if result && target.respond_to?(:update_ranking!)
      target.update_ranking!
    end

    result
  end

  def self.remove_favourite(user, target)
    favourite = find_by(user: user, target: target)
    return false unless favourite
    favourite.remove_favourite
  end

  def remove_favourite
    result = destroy.destroyed?

    if result
      target.update_ranking!
    end

    result
  end
end
