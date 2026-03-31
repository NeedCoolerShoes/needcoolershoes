class SiteController < ApplicationController
  before_action :authenticate_user!, only: :button
  def modlog
    meta_config do |config|
      config.title = "Moderation Log"
      config.description = "Log of moderation changes to content on the site."
    end

    query = Modlog.order_by_creation
    query = query.merge(Modlog.with_user(params[:user])) if params[:user].present?
    query = query.merge(Modlog.with_target_id(params[:id])) if params[:id].present?
    query = query.merge(Modlog.with_target_type(params[:type])) if params[:type].present?

    items = (params[:items] || 20).to_s.to_i.clamp(1..50)
    params[:page].to_i > 0 ? nil : params[:page] = 1
    
    @pagy, @modlogs = pagy(query, items: items)
  rescue Pagy::OverflowError
    not_found_error
  end

  def preview
    meta_config do |config|
      config.title = "Preview Skin"
      config.description = "Tool to preview skins made in our editor, before uploading them to the gallery."
    end
  end

  def microsoft_identity_association
  end

  def button
    if current_user.has_badge_with_tag?("the_button")
      redirect_to root_path, alert: "Don't be greedy."
      return
    end

    response = HTTP.post("https://thebutton.needcoolershoes.com/press", form: {user_id: current_user.id})
    if response.status.success?
      time = response.body.to_s.to_i

      color = case time
      when 1500..1800 then "purple"
      when 1200..1499 then "blue"
      when 900..1199 then "green"
      when 600..899 then "yellow"
      when 300..599 then "orange"
      when 0..299 then "red"
      end

      badge = Badge.with_tag(["the_button", color]).first
      UserBadge.create(user: current_user, badge: badge)

      redirect_to root_path, notice: "You obtained the #{color} button badge!"
    else
      redirect_to root_path, alert: "Error pressing the button :("
    end
  end
end
