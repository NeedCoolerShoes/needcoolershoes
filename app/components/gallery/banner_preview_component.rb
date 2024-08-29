# frozen_string_literal: true

class Gallery::BannerPreviewComponent < ViewComponent::Base
  def initialize(banner:, shield: false)
    @banner = banner
    @shield = shield
  end
end
