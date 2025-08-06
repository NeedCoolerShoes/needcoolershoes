class AddMinimumVersionToBanner < ActiveRecord::Migration[8.0]
  def change
    add_column :banners, :minimum_version, :integer, null: false, default: 0

    reversible do |dir|
      dir.up {
        Banner.find_each do |banner|
          banner.minimum_version = banner.calculate_minimum_version
          banner.save(validate: false)
        end
      }
    end
  end
end
