class AddWatermarkDisabledToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :watermark_disabled, :boolean
  end
end
