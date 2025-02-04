# frozen_string_literal: true

class Gallery::CardComponent < ViewComponent::Base
  include UserHelper

  attr_reader :url, :title

  renders_one :preview
  renders_one :overlay
  renders_one :quick_actions

  def initialize(url: "", title: "")
    @url = url
    @title = title
  end

  def is_moderator?
    return false unless helpers.current_user&.moderator?
    true
  end
end
