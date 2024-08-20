
namespace :pixel_count do
  task update: :environment do
    User.all.each { |u| u.update_pixel_count! }
  end
end
