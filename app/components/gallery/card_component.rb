# frozen_string_literal: true

class Gallery::CardComponent < ViewComponent::Base
  include UserHelper

  renders_one :preview
  renders_one :overlay

  def initialize(url: "")
    @url = url
  end
end
