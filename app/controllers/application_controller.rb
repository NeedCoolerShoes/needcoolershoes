class ApplicationController < ActionController::Base
  include Pagy::Backend

  before_action :configure_devise_parameters, if: :devise_controller?

  def configure_devise_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[featured_skin_id])
  end
end