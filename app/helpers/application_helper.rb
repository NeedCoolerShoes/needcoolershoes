module ApplicationHelper
  include Pagy::Frontend

  def meta_config
    @meta_config ||= ApplicationController::DEFAULT_META_CONFIG.call
  end
end
