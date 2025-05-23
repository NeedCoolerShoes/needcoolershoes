class SessionsController < Devise::SessionsController
  prepend_before_action :verify_otp, only: :create

  def otp
  end

  private

  def verify_otp
    configure_devise_parameters
    set_otp_resource
    return unless resource.present?

    resource.login = resource.email if sign_in_params[:login] == resource.email

    return render_invalid_credentials unless resource.valid_password?(sign_in_params[:password])
    return if passes_otp_check?(resource)

    flash[:alert] = "Invalid one-time password." if sign_in_params[:otp_attempt]
    render :otp, status: 422
  end

  def set_otp_resource
    self.resource = User.with_login(sign_in_params[:login].to_s).first
  end

  def passes_otp_check?(res)
    return true unless res.otp_required_for_login?
    return true if res.verify_otp!(sign_in_params[:otp_attempt] || "")

    res.password = sign_in_params[:password]
    false
  end

  def render_invalid_credentials
    flash[:alert] = t("devise.failure.invalid", authentication_keys: "Login")
    render :new, status: 422
  end
end
