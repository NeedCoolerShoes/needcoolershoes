class SessionsController < Devise::SessionsController
  prepend_before_action :verify_otp, only: :create

  def otp
  end

  private

  def verify_otp
    configure_devise_parameters
    return true if passes_otp_check?
    render :otp, status: 422
  end

  def passes_otp_check?
    self.resource = User.with_login(sign_in_params[:login]).first
    return false unless self.resource.present?
    return true unless self.resource.otp_required_for_login?
    return true if self.resource.verify_otp!(sign_in_params[:otp_attempt] || "")
    self.resource.password = sign_in_params[:password]
    false
  end
end
