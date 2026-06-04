class AddIndexToSkinPartsAndCategories < ActiveRecord::Migration[8.0]
  def change
    add_index :skin_parts, :name, unique: true
    add_index :skin_categories, :name, unique: true
  end
end
