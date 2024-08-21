class ChangeFavouritesCountToBeZero < ActiveRecord::Migration[7.0]
  def up
    Skin.where(favourites_count: nil).update_all(favourites_count: 0)
    Banner.where(favourites_count: nil).update_all(favourites_count: 0)
    
    change_column :skins, :favourites_count, :integer, null: false, default: 0
    change_column :banners, :favourites_count, :integer, null: false, default: 0
  end

  def down
    change_column :skins, :favourites_count, :integer, null: true, default: nil
    change_column :banners, :favourites_count, :integer, null: true, default: nil
  end
end
