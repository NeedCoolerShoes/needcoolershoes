class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def router
    @router ||= Router.new
  end
end
