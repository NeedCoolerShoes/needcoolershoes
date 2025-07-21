namespace :gallery_scores do
  task update: :environment do
    Skin.find_each do |skin|
      skin.update_ranking!
    end

    Banner.find_each do |banner|
      banner.update_ranking!
    end
  end
end
