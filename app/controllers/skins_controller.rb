class SkinsController < ApplicationController
  before_action :authenticate_user!, only: %i[edit destroy]
  before_action :set_skin, only: %i[show edit update download destroy add_favourite remove_favourite preview]
  before_action :validate_can_edit, only: %i[edit update destroy]
  before_action :check_visibility, only: %i[show download]

  def index
    @gallery_params = gallery_params
    skins = Skin.with_params(@gallery_params)
    skins = skins.merge(Skin.order_by_created) unless gallery_params[:order].present?
    if current_user.present?
      skins = skins.merge(Skin.visible_to_user(current_user))
    else
      skins = skins.merge(Skin.is_public)
    end
    items = (gallery_params[:items] || 12).to_i.clamp(1, 50)
    @pagy, @skins = pagy(skins, items: items)
  rescue Pagy::OverflowError
    redirect_to gallery_path
  end

  def show
    respond_to do |format|
      format.png { send_data @skin.preview_img, type: "image/png", disposition: "inline" }
      format.html { render }
    end
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
    send_data @skin.to_png, type: "image/png", filename: "download.png"
    unless current_user == @skin.user
      @skin.download_count = (@skin.download_count || 0) + 1
      @skin.save(touch: false)
    end
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
      if Favourite.create(skin: @skin, user: current_user)
        format.turbo_stream { 
          render turbo_stream: turbo_stream.replace(
            "favourite_skin_#{@skin.id}",
            partial: "skins/skin_favourite",
            locals: { skin: @skin, size: params[:size], redirect: params[:redirect] }
          )
        }
        format.html { redirect_to params[:redirect], notice: "Added skin to favourites." }
      else
        format.html { redirect_to params[:redirect], alert: "Error favouriting skin." }
      end
    end
  end

  def remove_favourite
    favourite = Favourite.find_by(skin: @skin, user: current_user)
    respond_to do |format|
      if favourite.destroy
        format.turbo_stream { 
          render turbo_stream: turbo_stream.replace(
            "favourite_skin_#{@skin.id}",
            partial: "skins/skin_favourite",
            locals: { skin: @skin, size: params[:size], redirect: params[:redirect] }
          )
        }
        format.html { redirect_to params[:redirect], notice: "Removed skin from favourites." }
      else
        format.html { redirect_to params[:redirect], alert: "Error removing favourite skin." }
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

  def check_visibility
    return true unless @skin.is_private?
    unless current_user.present?
      redirect_to gallery_path
      return false
    end
    redirect_to gallery_path unless current_user.id == @skin.user_id
  end

  def validate_can_edit
    return true if @skin.can_user_edit?(current_user)
    redirect_to gallery_path
  end

  def skin_params
    params.require(:skin).permit(:name, :description, :tags, :data, :visibility, :model, :skin_part_id, :skin_category_id, :user_id, :terms_and_conditions)
  end

  def gallery_params
    params.reject! { |_, value| !value.present? }
    params.slice(:user, :part, :category, :model, :date_offset, :tag, :favourited_by, :search, :order, :items).permit!
  end

  def transform_tags(tags)
    json = JSON.parse(tags)
    json.map { |tag| tag["value"] }
  rescue
    []
  end
end