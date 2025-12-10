class CreateBlockedEmailDomains < ActiveRecord::Migration[8.0]
  def change
    create_table :blocked_email_domains do |t|
      t.string :domain, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
