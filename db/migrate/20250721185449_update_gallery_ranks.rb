class UpdateGalleryRanks < ActiveRecord::Migration[8.0]
  def change
    reversible do |dir|
      dir.up { Rake::Task['gallery_scores:update'].invoke }
    end
  end
end
