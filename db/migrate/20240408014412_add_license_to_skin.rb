class AddLicenseToSkin < ActiveRecord::Migration[7.0]
  def change
    add_column :skins, :license, :integer
  end
end
