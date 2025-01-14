class AddJamTagsToSkin < ActiveRecord::Migration[7.1]
  def change
    add_column :skins, :jam_tags, :string, array: true, null: false, default: []

    reversible do |dir|
      dir.up do
        SkinJam.all.each do |jam|
          jam.skins.update_all(['jam_tags = array_append(jam_tags, ?)', jam.tag])
        end
      end
    end
  end
end
