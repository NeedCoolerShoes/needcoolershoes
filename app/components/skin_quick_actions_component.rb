# frozen_string_literal: true

class SkinQuickActionsComponent < ViewComponent::Base
  def initialize(skin:, redirect:)
    @skin = skin
    @redirect = redirect
  end
end
