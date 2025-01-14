class AddStartAndEndDatesToSkinJam < ActiveRecord::Migration[7.1]
  def change
    add_column :skin_jams, :start_at, :datetime, null: :false, default: Time.at(0)
    add_column :skin_jams, :end_at, :datetime, null: false, default: Time.at(0)
  end
end
