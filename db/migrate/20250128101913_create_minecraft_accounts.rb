class CreateMinecraftAccounts < ActiveRecord::Migration[7.1]
  def change
    create_table :minecraft_accounts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :username, null: false
      t.string :uuid, null: false
      t.string :texture, null: false
      t.string :minecraft_token, null: false
      t.datetime :minecraft_token_expires_at, null: false
      t.string :refresh_token, null: false
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
