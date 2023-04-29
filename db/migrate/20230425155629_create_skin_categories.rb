class CreateSkinCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :skin_categories do |t|
      t.string :name

      t.timestamps
    end
  end
end
