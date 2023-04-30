class Skin < ApplicationRecord
  belongs_to :user
  belongs_to :skin_category
  belongs_to :skin_part

  enum :visibility, %i[is_public is_unlisted is_private], default: :is_public

  validates :terms_and_conditions, acceptance: true
end
