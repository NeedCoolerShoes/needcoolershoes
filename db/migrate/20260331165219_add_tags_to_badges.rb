class AddTagsToBadges < ActiveRecord::Migration[8.0]
  def change
    add_column :badges, :tags, :string, array: true, default: []
  end
end
