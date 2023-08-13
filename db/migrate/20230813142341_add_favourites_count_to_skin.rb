class AddFavouritesCountToSkin < ActiveRecord::Migration[7.0]
  def change
    add_column :skins, :favourites_count, :integer
  end
end
