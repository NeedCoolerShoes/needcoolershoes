class SiteController < ApplicationController
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
end
