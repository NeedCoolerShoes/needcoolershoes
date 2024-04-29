class CreateSkinJamWinners < ActiveRecord::Migration[7.0]
  def change
    create_table :skin_jam_winners do |t|
      t.references :skin_jam, null: false, foreign_key: true
      t.references :skin, null: false, foreign_key: true
      t.integer :place, null: false

      t.timestamps
    end
  end
end
