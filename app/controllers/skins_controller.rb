class SkinsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update edit destroy]
  before_action :set_skin, only: %i[show edit moderator_edit update moderator_update download destroy add_favourite remove_favourite preview social embed]
  before_action :validate_can_edit, only: %i[edit update destroy]
  before_action :check_visibility, only: %i[show download social embed]
  require_role :moderator, only: %i[moderator_edit moderator_update]
  nav_section :gallery

  after_action :allow_iframe, only: :embed

  def index
    @gallery_params = gallery_params
    set_jam_info
    index_meta_config
    skins = Skin.with_params(@gallery_params)
    skins = skins.merge(Skin.order_by_created) unless gallery_params[:order].present?
    skins = if current_user.present?
      if @gallery_params[:hidden] && current_user.authorized?(:moderator)
        skins.merge(Skin.hidden)
      else
        skins.merge(Skin.visible_to_user(current_user))
      end
    else
      skins.merge(Skin.visible.is_public)
    end
    items = (gallery_params[:items] || 24).to_i.clamp(1, 50)
    params[:page].to_i > 0 ? nil : params[:page] = 1
    @pagy, @skins = pagy(skins, items: items)
  rescue Pagy::OverflowError
    redirect_to gallery_path
  end

  def show
    show_meta_config
    @attributions = @skin.attributions.attributed_visible_to_user(current_user).with_attributed_skin
    @variants = @skin.variants.visible_to_user(current_user)
    respond_to do |format|
      format.png { send_data @skin.preview_img, type: "image/png", disposition: "inline" }
      format.html { render }
      format.any { render }
    end
  end

  def social
    respond_to do |format|
      format.png { send_data @skin.social_img, type: "image/png", disposition: "inline" }
    end
  end

  def create
    params = skin_params.dup
    params.delete(:tags)
    params[:tag_list] = transform_tags(skin_params[:tags])
    @skin = Skin.new(params.except(:attributions))
    @skin.user = current_user

    license = :cc_by_sa_4
    license = :mncs if @skin.created_by_archive?
    license = :arr if @skin.created_by_arr?
    @skin.license = license

    respond_to do |format|
      if @skin.save
        if params[:attributions].is_a? Array
          params[:attributions].each { |url| SkinAttribution.create_from_url(@skin, *url.split(/\r\n|\r|\n/)) }
        end
        format.html { redirect_to root_path, notice: "Skin was successfully created." }
      else
        format.html { redirect_to root_path, alert: "Error saving skin. #{@skin.errors.messages}" }
      end
    end
  end

  def edit
    meta_config { |config| config.title = "Editing Skin" }
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

  def embed
    render layout: false
  end

  def moderator_edit
    meta_config { |config| config.title = "Moderating Skin" }
  end

  def moderator_update
    old_attr = @skin.attributes
    reason = params[:reason]
    params = skin_params.dup
    params.delete(:tags)
    params[:tag_list] = transform_tags(skin_params[:tags])

    respond_to do |format|
      skin, modlog = nil
      ActiveRecord::Base.transaction do
        skin = @skin.update!(params)
        new_attr = @skin.reload.attributes
        modlog = Modlog.generate!(@skin, current_user, old_attr, new_attr, reason)
      end
      raise "Error saving skin or modlog" unless skin && modlog

      format.html { redirect_to @skin, notice: "Skin was successfully updated." }
    rescue
      format.html { redirect_to skin_moderate_path(@skin), alert: "Error saving skin." }
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
            locals: {skin: @skin, size: params[:size], redirect: params[:redirect]}
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
            locals: {skin: @skin, size: params[:size], redirect: params[:redirect]}
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

  def index_meta_config
    meta_config do |config|
      config.title = if params[:user].present?
        "Skins by #{params[:user].titleize}"
      elsif params[:favourited_by].present?
        "#{params[:favourited_by].titleize}'s Favourites"
      else
        "Gallery"
      end
      config.title << (params[:page].present? ? " (Page #{params[:page]})" : "")
      config.description = "Search and browse Minecraft skins created with our Skin Editor, by part, category or tag."

      if @jam.present?
        config.title = @jam.name
        config.description = @jam.description.to_s.split("\n").first.strip
      end
    end
  end

  def show_meta_config
    desc = if @skin.description.present?
      @skin.description.tr("\n", " ").delete_suffix(".").strip
    else
      "Skin by #{@skin.user.display_name}"
    end
    desc << ". A Minecraft skin, created with NeedCoolerShoes Skin Editor."

    meta_config do |config|
      config.title = "#{@skin.name.truncate(32)} by #{@skin.user.display_name.truncate(32)}"
      config.image = skin_social_url(@skin, format: :png)
      config.image_alt = "#{config.title} - Minecraft Skin"
      config.description = desc.truncate(130)
    end
  end

  def render_img_missing
    img = File.read("public/ncsassets/img/missing_img.png")

    respond_to do |format|
      format.png { send_data img, type: "image/png", disposition: "inline", status: 200 }
      format.json { render json: {error: 404, message: "Skin not found."}, status: 404 }
      format.any { redirect_to gallery_path }
    end
  end

  def set_skin
    @skin = Skin.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render_img_missing
  end

  def set_jam_info
    return unless params[:tag].present?
    @jam = SkinJam.find_by(tag: params[:tag])
  end

  def check_visibility
    return true unless @skin.is_private? || @skin.hidden
    if current_user.present?
      return true if current_user.id == @skin.user_id
      return true if current_user.authorized?(:moderator)
    end
    render_img_missing
  end

  def validate_can_edit
    return true if @skin.can_user_edit?(current_user)
    redirect_to gallery_path
  end

  def skin_params
    permit = [:name, :description, :tags, :data, :visibility, :model, :skin_part_id, :skin_category_id, :creator, :terms_and_conditions, :hidden, attributions: []]
    permit.append(:license) if current_user.authorized?(:moderator)
    params.require(:skin).permit(permit)
  end

  def gallery_params
    params.reject! { |_, value| !value.present? }
    params.slice(:user, :part, :category, :model, :date_offset, :tag, :favourited_by, :search, :order, :items, :hidden).permit!
  end

  def transform_tags(tags)
    json = JSON.parse(tags)
    json.map { |tag| tag["value"] }
  rescue
    []
  end

  def allow_iframe
    response.headers.except! "X-Frame-Options"
  end
end
