class SkinPart < ApplicationRecord
  has_many :skins

  validates :name, uniqueness: true
  attribute :skin_upload_status, :integer, default: 0
  enum :skin_upload_status, %i[no_upload manual_upload automatic_upload]

  def can_manually_upload?
    manual_upload? || automatic_upload?
  end
end
