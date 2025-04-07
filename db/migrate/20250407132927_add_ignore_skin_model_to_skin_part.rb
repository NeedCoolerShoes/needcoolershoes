class AddIgnoreSkinModelToSkinPart < ActiveRecord::Migration[7.2]
  def change
    add_column :skin_parts, :ignore_skin_model, :boolean, null: false, default: false
  end
end
