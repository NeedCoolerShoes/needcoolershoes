module ApplicationHelper
  include Pagy::Frontend

  def meta_config
    @meta_config ||= ApplicationController::DEFAULT_META_CONFIG.call
  end

  def can_use_gallery_filters?
    return true unless Needcoolershoes::Config.require_authentication_for_gallery_filters

    current_user.present?
  end
end
