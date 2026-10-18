class PlayerHeadCommandGenerator
  LATEST_VERSION = :"1_20_5"
  VERSIONS = {
    :"1_20_5" => "1.20.5+",
    :"1_16" => "1.16 to 1.20.4",
    :"1_14" => "1.14 to 1.15.2",
    :"1_13" => "1.13 to 1.13.2",
    :"1_8" => "1.8 to 1.12.2"
  }

  def initialize(url, name, author, site_url)
    @url = url
    @name = name
    @author = author
    @site_url = site_url
  end

  def generate(version)
    case version
    when :"1_20_5" then generate_1_20_5
    when :"1_16" then generate_1_16
    when :"1_14" then generate_1_14
    when :"1_13" then generate_1_13
    when :"1_8" then generate_1_8
    end
  end

  def uuid
    Digest::UUID.uuid_v4
  end

  def normalized_name
    name = @name.to_s.gsub(/[^ -~]|["']/, " ").squeeze(" ").strip

    return "Player Head" if name == ""

    name
  end

  def custom_name_component
    {text: normalized_name, italic: false}
  end

  def lore_component
    [
      {text: "by ", italic: false, color: "gray", extra: [{text: "@#{@author}", color: "aqua"}]},
      "",
      {text: @site_url, italic: false, color: "white"},
    ]
  end

  def generate_1_20_5
    name = custom_name_component.to_json
    lore = lore_component.to_json

    "give @p player_head[custom_name=#{name},lore=#{lore},profile={name:\"NeedCoolerShoes\",properties:[{name:\"textures\",value:\"#{to_base64}\"}]}] 1"
  end

  def generate_1_16
    name = custom_name_component.to_json
    lore = lore_component.map { |c| "'#{c.to_json}'" }.join(",")

    "give @p player_head{display:{Name:'#{name}',Lore:[#{lore}]},SkullOwner:{Id:[I;0,0,0,0],Properties:{textures:[{Value:\"#{to_base64}\"}]}}} 1"
  end

  def generate_1_14
    name = custom_name_component.to_json.to_json
    lore = lore_component.map { |c| c.to_json }.to_json

    "give @p player_head{display:{Name:#{name},Lore:#{lore}},SkullOwner:{Id:\"#{uuid}\",Properties:{textures:[{Value:\"#{to_base64}\"}]}}} 1"
  end

  def generate_1_13
    name = custom_name_component.to_json.to_json
    lore = ["by @#{@author}", "", @site_url].to_json

    "give @p player_head{display:{Name:#{name},Lore:#{lore}},SkullOwner:{Id:\"#{uuid}\",Properties:{textures:[{Value:\"#{to_base64}\"}]}}} 1"
  end

  def generate_1_8
    name = normalized_name.to_json
    lore = ["by @#{@author}", "", @site_url].to_json

    "give @p skull 1 3 {display:{Name:#{name},Lore:#{lore}},SkullOwner:{Id:\"#{uuid}\",Properties:{textures:[{Value:\"#{to_base64}\"}]}}}"
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