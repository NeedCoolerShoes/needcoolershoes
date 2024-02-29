class BadgesController < ApplicationController
  def index
    @badges = Badge.with_user_badges
  end
end