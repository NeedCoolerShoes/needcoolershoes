class CreateSkinAttributions < ActiveRecord::Migration[7.0]
  def change
    create_table :skin_attributions do |t|
      t.references :skin, null: false, foreign_key: true
      t.references :attributed_skin, foreign_key: {to_table: :skins}
      t.string :url
      t.string :author

      t.timestamps
    end
  end
end
