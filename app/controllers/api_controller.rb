class ApiController < ApplicationController
  def skin
    data = MinecraftApi.skin_from_username(params[:id])
    if data.is_a?(Net::HTTPSuccess)
      send_data data.body, type: "image/png"
    else
      render json: {error: "Could not load skin for given username."}, status: 404
    end
  end

  def tags
    case params[:for]
    when "skin" then skin_tags
    when "banner" then banner_tags
    else skin_tags
    end
  end

  private

  def skin_tags
    list = Skin.tags_on("tags").named_like(params[:query] || "").limit(20)
    render json: list.map { |tag|
      status = ""
      title = ""

      jam = SkinJam.find_by_tag(tag.name)
      if jam.present?
        status = jam.open? ? "open" : "closed"
        title = jam.open? ? "Belongs to a Jam" : "Jam is now closed"
      end

      {value: tag.name, jam_status: status, title: title}
    }
  end

  def banner_tags
    list = Banner.tags_on("tags").named_like(params[:query] || "").limit(20)
    render json: list.map { |tag|
      {value: tag.name, jam_status: "", title: ""}
    }
  end
end
