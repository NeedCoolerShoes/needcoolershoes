class SkinJam < ApplicationRecord
  has_many :winners, class_name: "SkinJamWinner"

  validates :tag, format: {with: /\A[a-z0-9\-_]+\z/, message: "only allows letters, numbers, dashes and underscores"}
end
