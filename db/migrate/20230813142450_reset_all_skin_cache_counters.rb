class ResetAllSkinCacheCounters < ActiveRecord::Migration[7.0]
  def up
    Skin.all.each do |skin|
      Skin.reset_counters(skin.id, :favourites_count)
    end
  end

  def down
    # no rollback needed
  end
end
