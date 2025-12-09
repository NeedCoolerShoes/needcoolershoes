class RegistrationsController < Devise::RegistrationsController
  CAPTCHA_QUESTION = "What item does a Creeper drop? (in English)"
  CAPTCHA_REGEX = /gun\s*powder/i

  prepend_before_action :verify_captcha, only: :create

  def new
    @captcha_question = CAPTCHA_QUESTION
    super
  end

  private

  def verify_captcha
    return if params[:question].to_s.match?(CAPTCHA_REGEX)
      
    redirect_to root_path, alert: "Question answered incorrectly"
  end
end