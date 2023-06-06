class ApiController < ApplicationController

  def skin
    data = MinecraftApi.skin_from_username(params[:id])
    if data.is_a?(Net::HTTPSuccess)
      send_data data.body, type: "image/png"
    else
      render json: { 'error': 'Could not load skin for given username.' }, status: 403
    end
  end

  def tags
    list = Skin.tags_on("tags").named_like(params[:query] || "").limit(20)
    render json: list.map { |tag| tag.name }
  end

end