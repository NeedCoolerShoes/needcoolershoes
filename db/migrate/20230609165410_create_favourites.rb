class CreateFavourites < ActiveRecord::Migration[7.0]
  def change
    create_table :favourites do |t|
      t.references :user, null: false, foreign_key: true
      t.references :skin, null: false, foreign_key: true
      t.integer :karma

      t.timestamps
    end
  end
end
