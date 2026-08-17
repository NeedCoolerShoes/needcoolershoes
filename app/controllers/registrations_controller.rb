class RegistrationsController < Devise::RegistrationsController
  prepend_before_action :check_signups_disabled, only: :create
  prepend_before_action :verify_captcha, only: :create

  private

  def check_signups_disabled
    return unless Needcoolershoes::Config.signups_disabled

    redirect_to root_path, alert: "Signups currently disabled"
  end

  def verify_captcha
    unless Altcha.verify(params.permit(:altcha)[:altcha])
      redirect_to new_user_registration_path, alert: "Invalid captcha. Please try again."
      return
    end

    return unless Discord::NewUserWebhook::WEBHOOK_URL.present?

    up = params[:user]

    base_email = up[:email].to_s
    domain = base_email.split("@").last
    blocked = BlockedEmailDomain.with_domain(domain).any?

    email = up[:email] + (blocked ? " ⚠️" : "")  

    Discord::NewUserWebhook.send_webhook(up[:name], email, params[:question], params[:captcha], request)
  end
end