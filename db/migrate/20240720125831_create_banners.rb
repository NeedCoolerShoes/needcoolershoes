class CreateBanners < ActiveRecord::Migration[7.0]
  def change
    create_table :banners do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.string :description
      t.string :data
      t.integer :favourites_count

      t.timestamps
    end
  end
end
