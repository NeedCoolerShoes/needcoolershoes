class AddModerationStatusToUser < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :moderation_status, :integer, null: false, default: 0
  end
end
