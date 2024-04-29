class ApiController < ApplicationController

  def skin
    data = MinecraftApi.skin_from_username(params[:id])
    if data.is_a?(Net::HTTPSuccess)
      send_data data.body, type: "image/png"
    else
      render json: { 'error': 'Could not load skin for given username.' }, status: 404
    end
  end

  def tags
    list = Skin.tags_on("tags").named_like(params[:query] || "").limit(20)
    render json: list.map {|tag|
      has_jam = SkinJam.where(tag: tag.name).any?
      title = has_jam ? "Belongs to a Jam" : ""
      {value: tag.name, has_jam: has_jam, title: title}
    }
  end

end