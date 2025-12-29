class BlockedEmailDomain < ApplicationRecord
  scope :with_domain, ->(domain) { where(domain: domain) }
end
