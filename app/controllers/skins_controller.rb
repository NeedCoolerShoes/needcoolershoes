class SkinsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update edit destroy minecraft_upload mineskin_upload]
  before_action :set_skin, only: %i[
    show edit moderator_edit update moderator_update download minecraft_upload
    texture destroy add_favourite remove_favourite preview social embed mineskin_upload quick_action
  ]
  before_action :validate_can_edit, only: %i[edit update destroy]
  before_action :check_visibility, only: %i[show download social embed]
  before_action :check_ban, only: %i[create]
  before_action :redirect_title, only: :show

  require_role :moderator, only: %i[moderator_edit moderator_update quick_action]
  
  nav_section :gallery
  nav_section :editor, only: :new

  after_action :allow_iframe, only: :embed

  layout "gallery", only: :index

  def index
    @gallery_params = gallery_params
    set_jam_info
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
    params[:page].to_i > 0 ? nil : params[:page] = 1
    items = (gallery_params[:items] || 24).to_i.clamp(1, 50)
    @pagy, @skins = pagy(skins, items: items)
    @tags = @skins.top_tags(10)

    index_meta_config
  rescue Pagy::OverflowError
    not_found_error
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

  def new
    @message = SiteMessage.latest&.message
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
        format.html { redirect_to @skin.to_title_path, notice: "Skin was successfully created." }
      else
        format.html { redirect_to root_path, alert: "Error saving skin. #{format_errors @skin.errors.messages}" }
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
        format.html { redirect_to @skin.to_title_path, notice: "Skin was successfully updated." }
      else
        format.html { redirect_to edit_skin_path(@skin), alert: "Error saving skin. #{format_errors @skin.errors.messages}" }
      end
    end
  end

  def embed
    respond_to do |format|
      format.html { render layout: false }
      format.any { not_found_error }
    end
  end

  def moderator_edit
    meta_config { |config| config.title = "Moderating Skin" }
  end

  def moderator_update
    old_attr = @skin.attributes
    old_attr["tag_list"] = @skin.tag_list
    reason = params[:reason]
    params = skin_params.dup
    params.delete(:tags)
    params[:tag_list] = transform_tags(skin_params[:tags])

    respond_to do |format|
      skin, modlog = nil
      ActiveRecord::Base.transaction do
        skin = @skin.update!(params)
        new_attr = @skin.reload.attributes
        new_attr["tag_list"] = @skin.tag_list
        modlog = Modlog.generate!(@skin, current_user, old_attr, new_attr, reason)
      end
      raise "Error saving skin or modlog" unless skin && modlog

      format.html { redirect_to @skin.to_title_path, notice: "Skin was successfully updated." }
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

  def texture
    respond_to do |format|
      format.png { send_data @skin.to_png, type: "image/png", disposition: "inline" }
    end
  end

  def destroy
    @skin.destroy
    respond_to do |format|
      format.html { redirect_to skins_gallery_path, notice: "Skin was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def add_favourite
    respond_to do |format|
      if Favourite.add_favourite(current_user, @skin)
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
    respond_to do |format|
      if Favourite.remove_favourite(current_user, @skin)
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
    redirect_to skins_gallery_path
  end

  def random
    skin = Skin.visible_to_user(current_user).ordered_by("random").first
    redirect_to skin.to_title_path
  end

  def preview
  end

  def minecraft_upload
    @minecraft_accounts = current_user.minecraft_accounts.authenticated.order_by_primary
  end

  def mineskin_upload
    return forbidden_error if !current_user.moderator? && !@skin.skin_part.can_manually_upload?
    return forbidden_error if @skin.minecraft_texture_url?

    @skin.schedule_mineskin_upload

    respond_to do |format|
      format.html { redirect_to @skin, notice: "Skin is being uploaded..." }
    end
  end

  def quick_action
    redirect_path = params[:redirect] || skins_gallery_path

    respond_to do |format|
      case params[:action_id]
      when "duplicate" then qa_moderate(format, redirect_path, {visibility: :is_unlisted}, "Skin is a duplicate of another skin.")
      when "slim" then qa_moderate(format, redirect_path, {model: :slim}, "Changed skin model from Classic to Slim.")
      when "nsfw" then qa_moderate(format, redirect_path, {hidden: true}, "NSFW content is not allowed on the site.")
      when "hate" then qa_moderate(format, redirect_path, {hidden: true}, "Imagery of Nazis / hate groups is not allowed on the site.")
      when "categorize" then qa_moderate(format, redirect_path, skin_params, "Moved skin to another part / category.")
      else not_found_error
      end
    end
  end

  private

  def index_meta_config
    meta_config do |config|
      if params[:user].present?
        config.title = "Minecraft Skins by #{params[:user].titleize}"
        config.description = "Browse minecraft skins created by #{params[:user].titleize}."
      elsif params[:favourited_by].present?
        config.title = "#{params[:favourited_by].titleize}'s Favorite Skins"
        config.description = "Browse minecraft skins favorited by #{params[:favourited_by].titleize}."
      else
        config.title = "Minecraft Skins"
        config.description = "Browse minecraft skins created with our skin editor, by part, category or tag."
      end
      config.title << (@pagy.page > 1 ? " (Page #{@pagy.page})" : "")

      if @jam.present?
        config.title = @jam.name
        config.description = @jam.description.to_s.split("\n")&.first&.strip || "Minecraft skin jam."
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
      config.title = "#{@skin.name.to_s.truncate(32)} by #{@skin.user.display_name.truncate(32)}"
      config.image = skin_social_url(@skin, format: :png)
      config.image_alt = "#{config.title} - Minecraft Skin"
      config.description = desc.to_s.truncate(130)
    end
  end

  def render_img_missing
    img = File.read("public/ncsassets/img/missing_img.png")

    respond_to do |format|
      format.png { send_data img, type: "image/png", disposition: "inline", status: 200 }
      format.json { render json: {error: 404, message: "Skin not found."}, status: 404 }
      format.any { not_found_error }
    end
  end

  def set_skin
    @skin = Skin.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render_img_missing
  end

  def redirect_title
    return unless request.format.html?
    return if @skin.to_url_title == params[:title]

    redirect_to @skin.to_title_path
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

  def check_ban
    return unless current_user.banned?
    redirect_to root_path, alert: current_user.ban_message || "You are currently banned."
  end

  def validate_can_edit
    return true if @skin.can_user_edit?(current_user)
    redirect_to skins_gallery_path
  end

  def skin_params
    permit = [:name, :description, :tags, :data, :visibility, :model, :skin_part_id, :skin_category_id, :creator, :terms_and_conditions, attributions: []]
    permit.append(:license, :hidden, :minecraft_texture_url) if current_user.authorized?(:moderator)
    params.require(:skin).permit(permit)
  end

  def gallery_params
    params.reject! { |_, value| !value.present? }
    params.slice(*Skin.gallery_params).permit!
  end

  def allow_iframe
    response.headers.except! "X-Frame-Options"
  end

  # Quick Actions
  
  def qa_mark_duplicate(format, redirect)
    format.html { redirect_to redirect }
  end

  def qa_moderate(format, redirect, params, reason)
    old_attr = @skin.attributes
    skin, modlog = nil
    ActiveRecord::Base.transaction do
      skin = @skin.update!(params)
      new_attr = @skin.reload.attributes
      modlog = Modlog.generate!(@skin, current_user, old_attr, new_attr, reason)
    end
    raise "Error saving skin or modlog" unless skin && modlog

    format.html { redirect_to redirect, notice: "Skin was successfully updated." }
  rescue
    format.html { redirect_to redirect, alert: "Error saving skin." }
  end
end
