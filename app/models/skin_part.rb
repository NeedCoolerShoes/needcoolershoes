class SkinPart < ApplicationRecord
  has_many :skins

  enum :skin_upload_status, %i[no_upload manual_upload automatic_upload]

  def can_manually_upload?
    manual_upload? || automatic_upload?
  end
end
