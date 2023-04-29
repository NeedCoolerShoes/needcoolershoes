class CreateSkinParts < ActiveRecord::Migration[7.0]
  def change
    create_table :skin_parts do |t|
      t.string :name

      t.timestamps
    end
  end
end
