class AddTagCacheToSkinsAndBanners < ActiveRecord::Migration[7.1]
  def change
    add_column :skins, :tag_cache, :integer, null: false, array: true, default: []
    add_column :banners, :tag_cache, :integer, null: false, array: true, default: []

    reversible do |dir|
      dir.up do
        Skin.find_each do |skin|
          skin.save_cached_tags!
        end

        Banner.find_each do |banner|
          banner.save_cached_tags!
        end
      end
    end
  end
end
