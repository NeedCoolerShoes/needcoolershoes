class PlayerHeadCommandGenerator
  LATEST_VERSION = :"1_20_5"
  VERSIONS = {
    :"1_20_5" => "1.20.5+",
    :"1_13" => "1.13 to 1.20.4",
    :"1_8" => "1.8 to 1.12"
  }

  def initialize(url)
    @url = url
  end

  def generate(version)
    case version
    when :"1_20_5" then generate_1_20_5
    when :"1_13" then generate_1_13
    when :"1_8" then generate_1_8
    end
  end

  def generate_1_20_5
    "give @p player_head[profile={name:\"NeedCoolerShoes\",properties:[{name:\"textures\",value:\"#{to_base64}\"}]}] 1"
  end

  def generate_1_13
    "give @p player_head{SkullOwner:{Id:\"c6283b14-35c6-4a29-9422-6327260c461c\",Properties:{textures:[{Value:\"#{to_base64}\"}]}}} 1"
  end

  def generate_1_8
    "give @p skull 1 3 {SkullOwner:{Id:\"c6283b14-35c6-4a29-9422-6327260c461c\",Properties:{textures:[{Value:\"#{to_base64}\"}]}}}"
  end

  private

  def to_base64
    data = {
      timestamp: Time.current.to_i,
      profileId: "c6283b1435c64a2994226327260c461c",
      profileName: "NeedCoolerShoes",
      textures: {
        SKIN: {
          url: @url
        }
      }
    }

    Base64.urlsafe_encode64(data.to_json, padding: true)
  end
end