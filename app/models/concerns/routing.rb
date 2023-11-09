module Routing
  extend ActiveSupport::Concern

  included do
    include Rails.application.routes.url_helpers
  end
  
  def default_url_options
    Rails.application.config.action_mailer.dig(:default_url_options)
  end

  extend self

  def respond_to_missing?(method, *args)
    Rails.application.routes.url_helpers.respond_to?(method)
  end

  def method_missing(method, *args)
    routes = Rails.application.routes
    routes.default_url_options = Rails.application.config.action_mailer.dig(:default_url_options)
    routes.url_helpers.send(method, *args)
  end
end