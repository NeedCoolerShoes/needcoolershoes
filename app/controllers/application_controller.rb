class ApplicationController < ActionController::Base
  include Pagy::Backend

  before_action :configure_devise_parameters, if: :devise_controller?
  
  rescue_from ActiveRecord::ConnectionNotEstablished, with: :db_connection_error

  def self.nav_section(nav, **options)
    before_action -> { @nav_section = nav }, options
  end

  def self.require_role(role, **options)
    before_action :forbidden_error, options.merge(unless: -> { authorized?(role) })
  end

  def configure_devise_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name display_name])
    devise_parameter_sanitizer.permit(:sign_in, keys: %i[otp_attempt])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[featured_skin_id])
  end

  private

  def authorized?(role, user = current_user)
    return false unless user.is_a? User
    user.authorized?(role)
  end

  def db_connection_error
    respond_to do |format|
      format.html { render layout: "plain", template: "errors/connect", status: 202 }
    end
  end

  def forbidden_error
    respond_to do |format|
      format.html { render layout: "plain", template: "errors/forbidden", status: 403 }
    end
  end
end