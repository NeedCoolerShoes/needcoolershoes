class SkinsController < ApplicationController
  before_action :authenticate_user!, only: %i[edit destroy]
  before_action :set_skin, only: %i[show edit update download destroy add_favourite remove_favourite]
  before_action :validate_owner, only: %i[edit update destroy]
  before_action :check_visibility, only: %i[show download]
  before_action :set_favouriting_user, only: %i[add_favourite remove_favourite]

  def index
    @gallery_params = gallery_params
    skins = Skin.order_by_created.with_params(@gallery_params)
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
    params = skin_params.dup
    params.delete(:tags)
    params[:tag_list] = transform_tags(skin_params[:tags])
    @skin = Skin.new(params)

    respond_to do |format|
      if @skin.save
        format.html { redirect_to root_path, notice: "Skin was successfully created." }
      else
        format.html { redirect_to root_path, alert: "Error saving skin." }
      end
    end
  end

  def update
    params = skin_params.dup
    params.delete(:tags)
    params[:tag_list] = transform_tags(skin_params[:tags])
    respond_to do |format|
      if @skin.update(params)
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

  def add_favourite
    respond_to do |format|
      if Favourite.create(skin: @skin, user: @user)
        format.html { redirect_to gallery_path(gallery_params), notice: "Added skin to favourites." }
      else
        format.html { redirect_to gallery_path(gallery_params), alert: "Error favouriting skin." }
      end
    end
  end

  def remove_favourite
    favourite = Favourite.find_by(skin: @skin, user: @user)
    respond_to do |format|
      if favourite.delete
        format.html { redirect_to gallery_path(gallery_params), notice: "Removed skin from favourites." }
      else
        format.html { redirect_to gallery_path(gallery_params), alert: "Error removing favourite skin." }
      end
    end
  rescue ActiveRecord::RecordNotFound
    redirect_to gallery_path 
  end

  private

  def set_skin
    @skin = Skin.find(params[:id])

  rescue ActiveRecord::RecordNotFound
    redirect_to gallery_path 
  end

  def set_favouriting_user
    @user = User.find(params[:user_id])
    return if @user == current_user
    redirect_to gallery_path

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
    params.require(:skin).permit(:name, :description, :tags, :data, :visibility, :model, :skin_part_id, :skin_category_id, :user_id, :terms_and_conditions)
  end

  def gallery_params
    params.permit(:user, :part, :category, :model, :date_offset, :tag, :favourited_by, :search)
  end

  def transform_tags(tags)
    json = JSON.parse(tags)
    json.map { |tag| tag["value"] }
  rescue
    []
  end
end