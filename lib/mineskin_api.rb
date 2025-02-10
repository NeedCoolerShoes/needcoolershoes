class MineskinApi < BaseApi
  class << self
    def upload_skin(mineskin_token, skin_data, name = "NeedCoolerShoes", variant = "classic")
      HTTP.auth("Bearer #{mineskin_token}").headers("User-Agent": "NeedCoolerShoes/1.0").post("https://api.mineskin.org/generate/upload", form: {
        variant: variant, name: name.truncate(20, omission: ""), visibility: 0,
        file: HTTP::FormData::Part.new(skin_data, content_type: "image/png", filename: "ncrsupload.png")
      })
    end
  end
end
