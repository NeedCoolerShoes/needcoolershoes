class Skin < ApplicationRecord
  belongs_to :user
  belongs_to :skin_category
  belongs_to :skin_part
end
