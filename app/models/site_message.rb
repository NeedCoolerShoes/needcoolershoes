class SiteMessage < ApplicationRecord
  validates :message, :active_at, presence: :true

  def self.latest
    record = where(active_at: ..Time.current).last
    return nil unless record.present?
    return nil if record.expires_at && record.expires_at < Time.current
    record
  end
end
