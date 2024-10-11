class ApplicationController < ActionController::Base
  include Pagy::Backend

  META_CONFIG = Struct.new(:title, :image, :image_alt, :description)
  DEFAULT_META_CONFIG = -> {
    META_CONFIG.new(
      "Skin Editor",
      "#{Routing.root_url}ncsassets/img/social.png",
      "Page image for Miners Need Cooler Shoes",
      "Minecraft Skin Editor and Gallery. Edit, upload and share your Minecraft skins, or create banners with our Banner Editor."
    )
  }

  before_action :configure_devise_parameters, if: :devise_controller?
  around_action :switch_locale
  rescue_from ActiveRecord::ConnectionNotEstablished, with: :db_connection_error

  def self.nav_section(nav, **options)
    before_action -> { @nav_section = nav }, options
  end

  def self.require_role(role, **options)
    before_action :forbidden_error, options.merge(unless: -> { authorized?(role) })
  end

  def self.meta_config(**options)
    meta_config = DEFAULT_META_CONFIG.call
    yield meta_config
    before_action -> { @meta_config = meta_config }, options
  end

  def switch_locale(&action) # Language change depending on the ?lang parameter ex: /gallery/?lang=(tr,en,pl)
    lang = params[:lang] || I18n.default_locale
    I18n.with_locale(lang, &action)
  end

  def configure_devise_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name display_name])
    devise_parameter_sanitizer.permit(:sign_in, keys: %i[otp_attempt])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[featured_skin_id])
  end

  def meta_config
    yield @meta_config ||= DEFAULT_META_CONFIG.call
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

  def not_found_error
    respond_to do |format|
      format.html { render file: "public/404.html", layout: false, status: 404 }
    end
  end

  def transform_tags(tags)
    json = JSON.parse(tags)
    json.map { |tag| tag["value"] }
  rescue
    []
  end

  def format_errors(errors)
    return unless errors.is_a? Hash
    output = []
    errors.each do |key, value|
      value.each do |entry|
        output << "#{key.to_s.titleize}: #{entry}"
      end
    end
    output.join(", ")
  end
end
