class AddPixelCacheToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :pixels, :integer, null: false, default: 0
    add_column :users, :pixels_cached_at, :datetime, null: false, default: Time.at(0)
  end
end
