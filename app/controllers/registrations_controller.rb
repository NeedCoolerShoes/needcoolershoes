class RegistrationsController < Devise::RegistrationsController
  CAPTCHA_QUESTION = "What item does a Creeper drop? (in English)"
  CAPTCHA_REGEX = /gun\s*powder/i

  prepend_before_action :check_signups_disabled, only: :create
  prepend_before_action :verify_captcha, only: :create

  def new
    @captcha_question = CAPTCHA_QUESTION.html_safe
    super
  end

  private

  def check_signups_disabled
    return unless Needcoolershoes::Config.signups_disabled

    redirect_to root_path, alert: "Signups currently disabled"
  end

  def verify_captcha
    if Discord::NewUserWebhook::WEBHOOK_URL.present?
      up = params[:user]
      Discord::NewUserWebhook.send_webhook(up[:name], up[:email], params[:question], params[:captcha], request)
    end

    return if params[:question].to_s.match?(CAPTCHA_REGEX)
      
    redirect_to root_path, alert: "Question answered incorrectly"
  end
end