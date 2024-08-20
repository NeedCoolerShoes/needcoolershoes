class ChangeFavouritesToBePolymorphic < ActiveRecord::Migration[7.0]
  def change
    # Add target type
    add_column :favourites, :target_type, :string
    # Update all existing favourites to be skin favourites
    reversible do |dir|
      dir.up {
        Favourite.update_all(target_type: "Skin")
        # Make it so target type can't be null
        change_column :favourites, :target_type, :string, null: false
      }
    end
    remove_foreign_key :favourites, :skins
    rename_column :favourites, :skin_id, :target_id
    add_index :favourites, :target_type
  end
end
