class BannersController < ApplicationController
  before_action :set_banner, only: %i[add_favourite remove_favourite]
  nav_section :gallery
  layout "gallery", only: :index

  def index
    index_meta_config
    items = (gallery_params[:items] || 24).to_i.clamp(1, 50)
    @gallery_params = gallery_params
    banners = Banner.with_params(@gallery_params)
    banners = banners.merge(Banner.order_by_created) unless gallery_params[:order].present?
    @pagy, @banners = pagy(banners, items: items)
    @gallery_tab = :banners
  end

  def random
    banner = Banner.ordered_by("random").first
    redirect_to banner_path("" => banner.data)
  end

  def add_favourite
    respond_to do |format|
      if Favourite.create(target: @banner, user: current_user)
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
    favourite = Favourite.find_by(target: @banner, user: current_user)
    respond_to do |format|
      if favourite.destroy
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

  private

  def gallery_params
    params.reject! { |_, value| !value.present? }
    params.slice(:user, :date_offset, :tag, :favourited_by, :search, :order, :items).permit!
  end

  def set_banner
    @banner = Banner.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render_img_missing
  end

  def index_meta_config
    meta_config do |config|
      config.title = if params[:user].present?
        "Banners by #{params[:user].titleize}"
      elsif params[:favourited_by].present?
        "#{params[:favourited_by].titleize}'s Favourites"
      else
        "Banner Gallery"
      end
      config.title << (params[:page].present? ? " (Page #{params[:page]})" : "")
      config.description = "Search and browse Minecraft banners created with our Banner Editor."
    end
  end
end
