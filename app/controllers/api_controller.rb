class ApiController < ApplicationController
  def skin
    res = MinecraftApi.skin_from_username(params[:id])

    data = res[:data]
    uuid = res[:uuid]
    model = res[:model]

    if data.is_a?(Net::HTTPSuccess)
      # Provide UUID as custom header, to keep API backwards compatible
      response.headers["X-NeedCoolerShoes-UUID"] = uuid
      response.headers["X-NeedCoolerShoes-Model"] = model

      response.headers["Access-Control-Expose-Headers"] = "X-NeedCoolerShoes-UUID, X-NeedCoolerShoes-Model"
      
      send_data data.body, type: "image/png", filename: uuid
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

  def outdated_browser_bypass
    cookies[:ncrs_browser_warning_accepted] = true

    path = params[:redirect] || root_path
    redirect_to path
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
