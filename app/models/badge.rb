class Badge < ApplicationRecord
  validates :name, :url, :karma, presence: true
end
