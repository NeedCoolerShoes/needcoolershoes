class BadgesController < ApplicationController
  def index
    meta_config do |config|
      config.title = "Hall of Fame"
      config.description = "A list of badges awarding the achievements of the Miners Need Cooler Shoes community."
    end
    @badges = Badge.with_user_badges
  end
end
