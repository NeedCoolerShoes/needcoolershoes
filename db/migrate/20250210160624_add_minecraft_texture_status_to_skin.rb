class AddMinecraftTextureStatusToSkin < ActiveRecord::Migration[7.1]
  def change
    add_column :skins, :minecraft_texture_status, :integer, null: false, default: 0

    reversible do |dir|
      dir.up do
        Skin.where.not(minecraft_texture_url: nil).update_all(minecraft_texture_status: :resolved)
      end
    end
  end
end
