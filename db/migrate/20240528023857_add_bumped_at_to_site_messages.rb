class AddBumpedAtToSiteMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :site_messages, :bumped_at, :datetime

    reversible do |direction|
      direction.up do
        SiteMessage.where(bumped_at: nil).update_all(bumped_at: Time.at(0))
      end
      direction.down {}
    end
  end
end
