# frozen_string_literal: true

class OpenCollectiveGoalComponent < ViewComponent::Base
  def goal
    OpencollectiveApi.get_goal_data
  end

  def progress
    data = goal
    if data[:balance] > 0
      ((data[:balance].to_f / data[:goal].to_f) * 100).round(2)
    else
      0
    end
  end

  def name
    goal[:name]
  end

  def bal_formatted
    number_to_currency(goal[:balance] / 100.0)
  end

  def goal_formatted
    number_to_currency(goal[:goal] / 100.0)
  end

  def url
    OpencollectiveApi.donation_url
  end
end
