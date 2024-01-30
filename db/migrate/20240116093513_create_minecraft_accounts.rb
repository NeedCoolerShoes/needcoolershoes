class CreateMinecraftAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :minecraft_accounts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :username
      t.text :skin
      t.uuid :uuid
      t.string :oid
      t.string :userhash
      t.string :xbl
      t.string :xsts
      t.string :mcjwt
      t.boolean :default

      t.timestamps
    end
  end
end
