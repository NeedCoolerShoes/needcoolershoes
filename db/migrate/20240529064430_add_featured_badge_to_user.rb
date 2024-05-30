class AddFeaturedBadgeToUser < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :featured_badge, foreign_key: {to_table: :badges}
  end
end
