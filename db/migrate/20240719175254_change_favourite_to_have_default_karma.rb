class ChangeFavouriteToHaveDefaultKarma < ActiveRecord::Migration[7.0]
  def change
    reversible do |dir|
      dir.up { change_column :favourites, :karma, :integer, null: false, default: 0 }
      dir.down { change_column :favourites, :karma, :integer, null: true, default: nil }
    end
  end
end
