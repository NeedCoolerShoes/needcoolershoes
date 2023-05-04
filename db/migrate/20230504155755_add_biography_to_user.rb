class AddBiographyToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :biography, :string
  end
end
