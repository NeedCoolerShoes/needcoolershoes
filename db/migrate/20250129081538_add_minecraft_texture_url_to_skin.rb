class AddMinecraftTextureUrlToSkin < ActiveRecord::Migration[7.1]
  def change
    add_column :skins, :minecraft_texture_url, :string
  end
end
