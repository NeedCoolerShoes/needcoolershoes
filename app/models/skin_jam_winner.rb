class SkinJamWinner < ApplicationRecord
  belongs_to :skin_jam
  belongs_to :skin

  scope :order_by_place, -> { order(place: :asc) }
end
