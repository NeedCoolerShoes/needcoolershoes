class StaticController < ApplicationController
  CAPTCHA_QUESTION = "What item does a Creeper drop?"
  CAPTCHA_REGEX = /gun\s*powder/i

  prepend_before_action :protect_from_spam, :only => [:send_message]

  def editor
  end

  def banner
  end

  def about
    render layout: "application"
  end

  def contact
    @question = CAPTCHA_QUESTION
    render layout: "application"
  end

  def sitemap
  end

  def send_message
    send_request_webhook
    respond_to do |format|
      if !params[:question].to_s.match?(CAPTCHA_REGEX)
        format.html { redirect_to root_path, notice: "Message was sent successfully!" }
      elsif Discord::SiteMessageWebhook.send_webhook(**contact_params.to_h.symbolize_keys)
        format.html { redirect_to root_path, notice: "Message was sent successfully!" }
      else
        format.html { redirect_to root_path, alert: "Error sending message." }
      end
    end
  end

  private

  def send_request_webhook
    Discord::SiteMessageRequestWebhook.send_webhook(request)
  rescue
    nil
  end

  def contact_params
    params.reject! { |_, value| !value.to_s.strip.present? }
    params[:name] ||= "Anonymous"
    params[:contact] ||= "None"
    params.permit(:name, :contact, :title, :message)
  end
end