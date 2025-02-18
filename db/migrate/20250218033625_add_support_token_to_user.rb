class AddSupportTokenToUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :support_token, :string, null: false, default: ""

    reversible do |dir|
      dir.up do
        User.find_each do |user|
          user.update_column(:support_token, ROTP::Base32.random)
        end
      end
    end
  end
end
