class StaticController < ApplicationController
  CAPTCHA_QUESTION = "What item does a Creeper drop? (in English)"
  CAPTCHA_REGEX = /(gun)?\s*po(w|u)der/i

  prepend_before_action :protect_from_spam, only: [:send_message]
  nav_section :editor, only: %i[editor editor_2010]
  nav_section :banner, only: :banner

  def editor
    @message = SiteMessage.latest&.message
  end

  def editor_2010
    meta_config do |config|
      config.title = "Skin Editor (2010)"
      config.description = "Legacy version of the Miners Need Cool Shoes editor, rewritten entirely in JS."
    end
    render layout: "editor/2010", template: "static/editor/2010"
  end

  def banner
    meta_config do |config|
      config.title = "Banner Maker"
      config.description = "Minecraft Banner Maker. Create Minecraft Banners for 1.21, and share with your friends."
    end
    render layout: "application"
  end

  def banner_2014
    meta_config do |config|
      config.title = "Banner Editor (2015)"
      config.description = "This is the legacy Banner Editor circa 2015."
    end
    render layout: "static", template: "static/banner/2014"
  end

  def about
    meta_config do |config|
      config.title = "About"
      config.description = "About the site Miners Need Cooler Shoes."
    end
    render layout: "application"
  end

  def faq
    meta_config do |config|
      config.title = "Frequently Asked Questions"
      config.description = "Frequently Asked Questions regarding Miners Need Cooler Shoes."
    end
    render layout: "application"
  end

  def contact
    meta_config do |config|
      config.title = "Contact Us"
      config.description = "Contact Miners Need Cooler Shoes for support or suggestions."
    end
    @question = CAPTCHA_QUESTION
    render layout: "application"
  end

  def sitemap
  end

  def rules
    meta_config do |config|
      config.title = "Site Rules"
      config.description = "Site rules and terms for Miners Need Cooler Shoes."
    end
  end

  def open_letter
    meta_config do |config|
      config.title = "An Open Letter to the Original Developers"
      config.description = "The original NeedCoolShoes.com site went down, and never returned."
      config.description << " This is an open letter to its original developer."
    end
  end

  def mncs_terms
    meta_config { |conf| conf.title = "Terms - MNCS Archive" }
  end

  def donate
    meta_config do |config|
      config.title = "Donate to the Project"
      config.description = "Donate to Miners Need Cooler Shoes, to help keep the site running."
    end
  end

  def send_message
    send_request_webhook if params[:question].present?
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
