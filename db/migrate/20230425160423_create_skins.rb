class CreateSkins < ActiveRecord::Migration[7.0]
  def change
    create_table :skins do |t|
      t.string :name, null: false
      t.string :description
      t.text :data, null: false
      t.integer :visibility, null: false
      t.boolean :terms_and_conditions
      t.references :user, null: false, foreign_key: true
      t.references :skin_category, foreign_key: true
      t.references :skin_part, foreign_key: true

      t.timestamps
    end
  end
end
