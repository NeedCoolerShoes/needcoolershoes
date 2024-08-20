# frozen_string_literal: true

class Gallery::SkinCardComponent < ViewComponent::Base
  include UserHelper

  renders_one :overlay

  def initialize(skin_card:, params:, show_visibility: false)
    @skin = skin_card
    @params = params
    @show_visibility = show_visibility
  end

  def show_visibility?
    return false unless @show_visibility.present?
    @show_visibility == @skin.user
  end

  def icon
    case @skin.visibility
    when "is_public" then "globe-alt"
    when "is_unlisted" then "link"
    else "eye-slash"
    end
  end
end
