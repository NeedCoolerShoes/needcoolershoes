class SkinJam < ApplicationRecord
  has_many :winners, class_name: "SkinJamWinner"

  validates :tag, format: {with: /\A[a-z0-9\-_]+\z/, message: "only allows letters, numbers, dashes and underscores"}

  scope :open, -> { where(start_at: ..Time.current, end_at: Time.current..) }

  def open?
    Time.current >= start_at && Time.current <= (end_at + lenient_seconds.seconds)
  end

  def status
    return :open if open?
    return :future if Time.current < start_at
    :past
  end

  def skins
    Skin.tagged_with_cached(tag)
  end
end
