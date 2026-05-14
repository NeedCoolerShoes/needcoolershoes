class SkinCategory < ApplicationRecord
  has_many :skins
  
  validates :name, uniqueness: true
end
