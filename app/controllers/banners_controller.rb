class BannersController < ApplicationController
  before_action :authenticate_user!, only: %i[create edit update]
  before_action :set_banner, only: %i[show edit update moderator_edit moderator_update add_favourite remove_favourite]
  before_action :validate_can_edit, only: %i[edit update destroy]
  before_action :check_visibility, only: :show
  before_action :redirect_title, only: :show

  require_role :moderator, only: %i[moderator_edit moderator_update]
  nav_section :gallery
  nav_section :banner, only: :new
  layout "gallery", only: :index

  def index
    index_meta_config
    params[:page].to_i > 0 ? nil : params[:page] = 1
    items = (gallery_params[:items] || 24).to_i.clamp(1, 50)
    @gallery_params = gallery_params
    banners = Banner.visible.with_params(@gallery_params)
    banners = banners.merge(Banner.order_by_created) unless gallery_params[:order].present?

    if @gallery_params[:hidden] && current_user.authorized?(:moderator)
      banners = banners.merge(Banner.hidden)
    end
    
    @pagy, @banners = pagy(banners, items: items)
    @tags = @banners.top_tags

    @banners_all = banners
    @gallery_tab = :banners
  rescue Pagy::OverflowError
    not_found_error
  end

  def random
    banner = Banner.ordered_by("random").first
    if banner.present?
      redirect_to banner.to_title_path
    else
      not_found_error
    end
  end

  def new
    meta_config do |config|
      config.title = "Banner Maker"
      config.description = "Minecraft Banner Maker. Create Minecraft Banners for 1.21, and share with your friends."
    end

    @gallery_tab = :banners
    @banner = Banner.new
  end

  def show
    show_meta_config
    @gallery_tab = :banners
  end

  def create
    params = banner_params.dup
    params.delete(:tags)
    params[:tag_list] = transform_tags(banner_params[:tags])
    @banner = Banner.new(params)
    @banner.user = current_user

    respond_to do |format|
      if @banner.save
        format.html { redirect_to @banner.to_title_path, notice: "Banner was successfully shared." }
      else
        format.html { redirect_to banner_editor_path, alert: "Error saving banner. #{format_errors @banner.errors.messages}" }
      end
    end
  end

  def update
    params = banner_params.dup
    params.delete(:tags)
    params[:tag_list] = transform_tags(banner_params[:tags])
    respond_to do |format|
      if @banner.update(params)
        format.html { redirect_to @banner.to_title_path, notice: "Banner was successfully updated." }
      else
        format.html { redirect_to edit_banner_path(@banner), alert: "Error saving banner." }
      end
    end
  end

  def destroy
  end

  def banner_2014
    meta_config do |config|
      config.title = "Banner Editor (2014)"
      config.description = "This is the legacy Banner Editor circa 2014."
    end
    render layout: "static", template: "banners/2014"
  end

  def add_favourite
    respond_to do |format|
      if Favourite.add_favourite(current_user, @banner)
        format.turbo_stream {
          render turbo_stream: turbo_stream.replace(
            "favourite_banner_#{@banner.id}",
            partial: "banners/banner_favourite",
            locals: {banner: @banner, size: params[:size], redirect: params[:redirect]}
          )
        }
        format.html { redirect_to params[:redirect], notice: "Added banner to favourites." }
      else
        format.html { redirect_to params[:redirect], alert: "Error favouriting banner." }
      end
    end
  end

  def remove_favourite
    respond_to do |format|
      if Favourite.remove_favourite(current_user, @banner)
        format.turbo_stream {
          render turbo_stream: turbo_stream.replace(
            "favourite_banner_#{@banner.id}",
            partial: "banners/banner_favourite",
            locals: {banner: @banner, size: params[:size], redirect: params[:redirect]}
          )
        }
        format.html { redirect_to params[:redirect], notice: "Removed banner from favourites." }
      else
        format.html { redirect_to params[:redirect], alert: "Error removing favourite banner." }
      end
    end
  rescue ActiveRecord::RecordNotFound
    redirect_to banners_gallery_path
  end

  def moderator_edit
  end

  def moderator_update
    old_attr = @banner.attributes
    old_attr["tag_list"] = @banner.tag_list
    reason = params[:reason]
    params = banner_params.dup
    params.delete(:tags)
    params[:tag_list] = transform_tags(banner_params[:tags])

    respond_to do |format|
      banner, modlog = nil
      ActiveRecord::Base.transaction do
        banner = @banner.update!(params)
        new_attr = @banner.reload.attributes
        new_attr["tag_list"] = @banner.tag_list
        modlog = Modlog.generate!(@banner, current_user, old_attr, new_attr, reason)
      end
      raise "Error saving banner or modlog" unless banner && modlog

      format.html { redirect_to @banner.to_title_path, notice: "Banner was successfully updated." }
    rescue
      format.html { redirect_to banner_moderate_path(@banner), alert: "Error saving banner." }
    end
  end

  private

  def gallery_params
    params.reject! { |_, value| !value.present? }
    params.slice(:user, :date_offset, :tag, :style, :favourited_by, :search, :order, :items, :compatibility, :hidden, :debug).permit!
  end

  def banner_params
    permit = [:name, :description, :style, :tags, :data, :terms_and_conditions]
    permit.append(:hidden) if current_user.authorized?(:moderator)
    params.require(:banner).permit(permit)
  end

  def set_banner
    @banner = Banner.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    not_found_error
  end

  def check_visibility
    return true unless @banner.hidden?
    if current_user.present?
      return true if @banner.user_id == current_user.id
      return true if current_user.authorized?(:moderator)
    end
    not_found_error
  end

  def redirect_title
    return unless request.format.html?
    return if @banner.to_url_title == params[:title]
    
    redirect_to @banner.to_title_path
  end

  def index_meta_config
    meta_config do |config|
      config.title = if params[:user].present?
        "Minecraft Banners by #{params[:user].titleize}"
      elsif params[:favourited_by].present?
        "#{params[:favourited_by].titleize}'s Favourite Banners"
      else
        "Minecraft Banners"
      end
      config.title << (params[:page].present? ? " (Page #{params[:page]})" : "")
      config.description = "Search and browse Minecraft banners created with our Banner Maker."
    end
  end

  def show_meta_config
    desc = if @banner.description.present?
      @banner.description.tr("\n", " ").delete_suffix(".").strip
    else
      "Banner by #{@banner.user.display_name}"
    end
    desc << ". A Minecraft banner, created with NeedCoolerShoes Banner Maker."

    meta_config do |config|
      config.title = "#{@banner.name.truncate(32)} by #{@banner.user.display_name.truncate(32)}"
      config.image_alt = "#{config.title} - Minecraft Banner"
      config.description = desc.truncate(130)
    end
  end

  def validate_can_edit
    return true if @banner.can_user_edit?(current_user)
    forbidden_error
  end
end
