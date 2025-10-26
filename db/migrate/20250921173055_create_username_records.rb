class CreateUsernameRecords < ActiveRecord::Migration[8.0]
  def change
    create_table :username_records do |t|
      t.string :name, null: false
      t.references :user, foreign_key: true
      t.boolean :banned, null: false, default: false

      t.timestamps
    end
  end
end
