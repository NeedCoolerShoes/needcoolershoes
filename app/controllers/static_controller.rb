class StaticController < ApplicationController
  def editor
  end

  def banner
  end

  def about
    render layout: "application"
  end

  def contact
    render layout: "application"
  end

  def sitemap
  end

  def send_message
    respond_to do |format|
      if Discord::SiteMessageWebhook.send_webhook(**contact_params.to_h.symbolize_keys)
        format.html { redirect_to root_path, notice: "Message was sent successfully!" }
      else
        format.html { redirect_to root_path, alert: "Error sending message." }
      end
    end
  end

  private

  def contact_params
    params.reject! { |_, value| !value.to_s.strip.present? }
    params[:name] ||= "Anonymous"
    params[:contact] ||= "None"
    params.permit(:name, :contact, :title, :message)
  end
end