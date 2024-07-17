class AddFeaturedSkinToUser < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :featured_skin, foreign_key: {to_table: :skins}
  end
end
