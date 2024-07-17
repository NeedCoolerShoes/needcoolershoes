class SiteController < ApplicationController
  def modlog
    query = Modlog.order_by_creation
    query = query.merge(Modlog.with_user(params[:user])) if params[:user].present?
    query = query.merge(Modlog.with_target_id(params[:id])) if params[:id].present?
    query = query.merge(Modlog.with_target_type(params[:type])) if params[:type].present?

    items = (params[:items] || 20).to_s.to_i.clamp(1..50)
    @pagy, @modlogs = pagy(query, items: items)
  end
end
