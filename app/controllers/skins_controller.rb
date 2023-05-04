class SkinsController < ApplicationController
  before_action :set_skin, only: %i[show download]
  before_action :check_visibility, only: %i[show download]

  def index
    skins = Skin.order_by_updated
    skins = skins.merge(Skin.by_user_name(params[:user])) if params[:user].present?
    if current_user.present?
      skins = skins.merge(Skin.visible_to_user(current_user))
    else
      skins = skins.merge(Skin.is_public)
    end
    @pagy, @skins = pagy(skins, items: 12)
  rescue Pagy::OverflowError
    redirect_to gallery_path
  end

  def show
  end

  def create
    @skin = Skin.new(skin_params)

    respond_to do |format|
      if @skin.save
        format.html { redirect_to root_path, notice: "Skin was successfully created." }
      else
        puts @skin.errors.messages
        format.html { redirect_to root_path, alert: "Error saving skin." }
      end
    end
  end

  def download
    send_data @skin.data, type: "image/png", filename: "download.png"
  end

  private

  def set_skin
    @skin = Skin.find(params[:id])

  rescue ActiveRecord::RecordNotFound
    redirect_to gallery_path 
  end

  def check_visibility
    return true unless @skin.is_private?
    unless current_user.present?
      redirect_to gallery_path unless current_user.present?
      return false
    end
    redirect_to gallery_path unless current_user.id == @skin.user_id
  end

  def skin_params
    params.require(:skin).permit(:name, :description, :data, :visibility, :skin_part_id, :skin_category_id, :user_id, :terms_and_conditions)
  end
end