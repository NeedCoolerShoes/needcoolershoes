class MinecraftApi < BaseApi
  class << self
    def username_to_uuid(name)
      safe_name = URI.encode_www_form_component(name)
      response = get("https://api.mojang.com/users/profiles/minecraft/#{safe_name}")
      return false unless response.is_a?(Net::HTTPSuccess)
      data = JSON.parse(response.body)
      data["id"]
    end

    def profile_info_from_uuid(uuid)
      response = get("https://sessionserver.mojang.com/session/minecraft/profile/#{uuid}")
      return false unless response.is_a?(Net::HTTPSuccess)
      JSON.parse(response.body)
    end

    def skin_from_uuid(uuid)
      info = profile_info_from_uuid(uuid)
      return false unless info.present?
      data = info["properties"][0]
      decoded = Base64.decode64(data["value"])
      json = JSON.parse(decoded)
      url = json["textures"]["SKIN"]["url"]
      get(url)
    end

    def skin_from_username(name)
      uuid = username_to_uuid(name)
      return false unless uuid.present?
      skin_from_uuid(uuid)
    end

    def upload_skin(minecraft_token, skin_data, variant = "classic")
      HTTP.auth("Bearer #{minecraft_token}").post("https://api.minecraftservices.com/minecraft/profile/skins", form: {
        variant: variant,
        file: HTTP::FormData::Part.new(skin_data, content_type: "image/png", filename: "ncrsupload.png")
      })
    end

    def change_skin(minecraft_token, skin_url, variant = "classic")
      HTTP.auth("Bearer #{minecraft_token}").post("https://api.minecraftservices.com/minecraft/profile/skins", json: {
        variant: variant,
        url: skin_url
      })
    end
  end
end
