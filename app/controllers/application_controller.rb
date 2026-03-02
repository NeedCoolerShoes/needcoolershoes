class ApplicationController < ActionController::Base
  include Pagy::Backend

  META_CONFIG = Struct.new(:title, :image, :image_alt, :description, :site_title)
  DEFAULT_META_CONFIG = -> {
    META_CONFIG.new(
      "Minecraft Skin Editor and Gallery",
      helpers.asset_path("social.png"),
      "Page image for Miners Need Cooler Shoes",
      "Minecraft Skin Editor and Gallery. Edit, upload and share your Minecraft skins, or create banners with our Banner Editor.",
      " :: NeedCoolerShoes"
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
  rescue I18n::InvalidLocale
    teapot_error
  end

  def configure_devise_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name display_name email question])
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
      format.json { render json: {status: 500, error: "Connecting to database, try again shortly"} }
      format.any { render layout: "plain", template: "errors/connect", status: 500 }
    end
  end

  def forbidden_error
    respond_to do |format|
      format.json { render json: {status: 403, error: "Forbidden"} }
      format.any { render layout: "plain", template: "errors/forbidden", status: 403 }
    end
  end

  def not_found_error
    respond_to do |format|
      format.json { render json: {status: 404, error: "Not found"} }
      format.any { render file: "public/404.html", layout: false, status: 404 }
    end
  end

  def teapot_error
    respond_to do |format|
      format.json { render json: {status: 418, error: "I'm a Teapot"} }
      format.any { render file: "public/418.html", layout: false, status: 418 }
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

  def browser_warning_accepted?
    return true if request.path == outdated_browser_path

    cookies[:ncrs_browser_warning_accepted].present?
  end

  def enforce_query_session!
    return unless request.format.to_s == "text/html"
    query = request.query_parameters

    return if query.empty?
    return if query["session"].present?

    query["session"] = generate_query_session_id
    redirect_to request.path + "?" + query.to_query
  end

  def generate_query_session_id
    Base64.urlsafe_encode64(SecureRandom.hex[..16].scan(/.{2}/).map {|b| b.to_i(16) }.pack("C*"), padding: false)
  end
end
