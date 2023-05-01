class ApiController < ApplicationController

  def skin
    data = MinecraftApi.skin_from_username(params[:id])
    if data.is_a?(Net::HTTPSuccess)
      send_data data.body, type: "image/png"
    else
      render json: { 'error': 'Could not load skin for given username.' }, status: 403
    end
  end

end