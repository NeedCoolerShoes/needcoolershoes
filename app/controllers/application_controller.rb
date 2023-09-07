class ApplicationController < ActionController::Base
  include Pagy::Backend

  before_action :configure_devise_parameters, if: :devise_controller?
  
  rescue_from ActiveRecord::ConnectionNotEstablished, with: :db_connection_error

  def configure_devise_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name])
    devise_parameter_sanitizer.permit(:sign_in, keys: %i[otp_attempt])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[featured_skin_id])
  end

  def db_connection_error
    respond_to do |format|
      format.html { render layout: "plain", template: "errors/connect", status: 202 }
    end
  end
end