class AddRankToSkinAndBanner < ActiveRecord::Migration[7.1]
  def change
    add_column :skins, :rank, :integer, null: false, default: 0
    add_column :banners, :rank, :integer, null: false, default: 0

    reversible do |dir|
      dir.up do
        Skin.calculate_rankings!
        Banner.calculate_rankings!
      end
    end
  end
end
