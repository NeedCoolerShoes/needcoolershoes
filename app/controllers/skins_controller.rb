class SkinsController < ApplicationController
  before_action :authenticate_user!, only: %i[edit destroy]
  before_action :set_skin, only: %i[show edit update download destroy]
  before_action :validate_owner, only: %i[edit update destroy]
  before_action :check_visibility, only: %i[show download]

  def index
    @gallery_params = gallery_params
    skins = gallery_filter_skins
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
        format.html { redirect_to root_path, alert: "Error saving skin." }
      end
    end
  end

  def update
    respond_to do |format|
      if @skin.update(skin_params)
        format.html { redirect_to @skin, notice: "Skin was successfully updated." }
      else
        format.html { redirect_to edit_skin_path(@skin), alert: "Error saving skin." }
      end
    end
  end

  def download
    send_data @skin.data, type: "image/png", filename: "download.png"
  end

  def destroy
    @skin.destroy
    respond_to do |format|
      format.html { redirect_to gallery_path, notice: "Skin was successfully destroyed." }
      format.json { head :no_content }
    end
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

  def validate_owner
    if current_user.present?
      return true if current_user.id == @skin.user.id
    end
    redirect_to gallery_path
  end

  def skin_params
    params.require(:skin).permit(:name, :description, :data, :visibility, :skin_part_id, :skin_category_id, :user_id, :terms_and_conditions)
  end

  def gallery_params
    params.permit(:user, :part, :category)
  end

  def gallery_filter_skins
    skins = Skin.order_by_updated
    skins = skins.merge(Skin.by_user_name(params[:user])) if params[:user].present?
    skins = skins.merge(Skin.by_part_name(params[:part])) if params[:part].present?
    skins = skins.merge(Skin.by_category_name(params[:category])) if params[:category].present?
    skins
  end
end