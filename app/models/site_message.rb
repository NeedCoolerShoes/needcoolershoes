class SiteMessage < ApplicationRecord
  validates :message, :active_at, presence: :true
  attribute :bumped_at, :datetime, default: Time.current

  scope :order_by_bumped_at, ->(order = :desc) { order(bumped_at: order, id: order) }

  def self.latest
    record = where(active_at: ..Time.current).order_by_bumped_at.first
    return nil unless record.present?
    return nil if record.expires_at && record.expires_at < Time.current
    record
  end
  
  def bump!(time = Time.current)
    update!(bumped_at: time)
  end
end
