class AddSearchCacheToSkinAndBanner < ActiveRecord::Migration[7.1]
  def change
    add_column :skins, :search_cache, :string, null: false, default: ""
    add_column :banners, :search_cache, :string, null: false, default: ""

    reversible do |dir|
      dir.up do
        Skin.find_each do |skin|
          skin.save_search_cache!
        end

        Banner.find_each do |banner|
          banner.save_search_cache!
        end
      end
    end
  end
end
