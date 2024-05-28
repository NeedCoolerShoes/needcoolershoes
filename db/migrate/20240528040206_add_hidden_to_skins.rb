class AddHiddenToSkins < ActiveRecord::Migration[7.0]
  def change
    add_column :skins, :hidden, :boolean, default: false
  end
end
