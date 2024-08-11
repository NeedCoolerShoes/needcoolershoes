class AddBanEndsAtToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :ban_ends_at, :datetime
    add_column :users, :ban_message, :string
  end
end
