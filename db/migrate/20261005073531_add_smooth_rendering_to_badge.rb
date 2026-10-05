class AddSmoothRenderingToBadge < ActiveRecord::Migration[8.0]
  def change
    add_column :badges, :smooth_rendering, :boolean, null: false, default: false
  end
end
