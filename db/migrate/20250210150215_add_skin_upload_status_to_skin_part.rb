class AddSkinUploadStatusToSkinPart < ActiveRecord::Migration[7.1]
  def change
    add_column :skin_parts, :skin_upload_status, :integer, null: false, default: 0
  end
end
