class CreateBadges < ActiveRecord::Migration[7.0]
  def change
    create_table :badges do |t|
      t.string :name
      t.string :description
      t.string :url
      t.integer :karma

      t.timestamps
    end
  end
end
