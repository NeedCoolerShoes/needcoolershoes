class AddStyleToBanner < ActiveRecord::Migration[7.0]
  def change
    add_column :banners, :style, :integer, null: false, default: 0

    reversible do |dir|
      dir.up { Banner.update_all(style: :banner) }
    end
  end
end
