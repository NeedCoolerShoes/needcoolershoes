class AddModelToSkin < ActiveRecord::Migration[7.0]
  def change
    add_column :skins, :model, :integer
  end
end
