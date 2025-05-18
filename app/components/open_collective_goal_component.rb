# frozen_string_literal: true

class OpenCollectiveGoalComponent < ViewComponent::Base
  def goal
    OpencollectiveApi.get_goal_data
  end

  def progress
    data = goal
    if data[:balance] > 0
      data[:goal] / data[:balance] / 100
    else
      0
    end
  end

  def name
    goal[:name]
  end
end
