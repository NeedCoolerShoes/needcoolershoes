# frozen_string_literal: true

class ButtonGameComponent < ViewComponent::Base
  def has_pressed
    helpers.current_user && helpers.current_user.has_badge_with_tag?("the_button")
  end
end
