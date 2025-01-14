class AddThemeToSkinJam < ActiveRecord::Migration[7.1]
  def change
    add_column :skin_jams, :theme, :string, null: false, default: ""
  end
end
