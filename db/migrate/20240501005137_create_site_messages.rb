class CreateSiteMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :site_messages do |t|
      t.string :message, null: false
      t.timestamp :active_at, null: false
      t.timestamp :expires_at

      t.timestamps
    end
  end
end
