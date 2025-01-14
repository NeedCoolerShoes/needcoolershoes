class AddLenienceToSkinJam < ActiveRecord::Migration[7.1]
  def change
    add_column :skin_jams, :lenient_seconds, :integer, null: false, default: 60
  end
end
