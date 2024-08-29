# frozen_string_literal: true

class Gallery::BannerCardComponent < ViewComponent::Base
  include BannersHelper
  include UserHelper

  def initialize(banner_card:, params:)
    @banner = banner_card
    @params = params
  end

  def shield?
    @banner.shield_style? || @params[:style] == "shield"
  end
end
