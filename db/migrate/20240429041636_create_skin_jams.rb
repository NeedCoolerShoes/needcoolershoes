class CreateSkinJams < ActiveRecord::Migration[7.0]
  def change
    create_table :skin_jams do |t|
      t.string :tag, null: false
      t.string :name, null: false
      t.string :description

      t.timestamps
    end

    add_index :skin_jams, :tag, unique: true
  end
end
