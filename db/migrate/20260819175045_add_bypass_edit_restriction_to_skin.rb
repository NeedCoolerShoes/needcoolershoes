class AddBypassEditRestrictionToSkin < ActiveRecord::Migration[8.0]
  def change
    add_column :skins, :bypass_edit_restriction, :boolean, null: false, default: false
  end
end
