class AddDownloadCountToSkin < ActiveRecord::Migration[7.0]
  def change
    add_column :skins, :download_count, :integer
  end
end
