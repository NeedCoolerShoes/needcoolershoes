class AddAttributionMessageToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :attribution_message, :string
  end
end
