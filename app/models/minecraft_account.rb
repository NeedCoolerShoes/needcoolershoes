class MinecraftAccount < ApplicationRecord
  belongs_to :user
  encrypts :xbl
  encrypts :xsts
  encrypts :mcjwt
  validates :oid, presence: true

  def self.create_or_update(user, code)
    ms_auth = MinecraftAuthApi.ms_auth(ENV["AZURE_APP_ID"], ENV["AZURE_APP_SECRET"], code, "http://localhost:3000/webhooks/minecraftauth")
    ms_auth_json = JSON.parse(ms_auth.body)
    ms_profile = MinecraftAuthApi.ms_profile(ms_auth_json["access_token"])
    ms_profile_json = JSON.parse(ms_profile.body)
    raise "Check: #{ms_profile_json}"
    response = MinecraftAuthApi.xbox_auth(token)
    response_json = JSON.parse(response.body)
    raise "Missing OID" unless oid = id_token["oid"]
    raise "Missing XBL Token" unless xbl = response_json["Token"]
    raise "Missing Userhash" unless uhs = response_json.dig("DisplayClaims", "xui", 0, "uhs")
    mcaccount = find_by(oid: oid)
    return mcaccount.update(xbl: xbl, userhash: uhs) if mcaccount.present?
    create(user: user, userhash: uhs, oid: oid, xbl: xbl)
  end

  def update_profile!
    xsts_auth = MinecraftAuthApi.xsts_auth(xbl)
    xsts_json = JSON.parse(xsts_auth.body)
    raise "Missing XSTS Token" unless xsts = xsts_json["Token"]
    mc_auth = MinecraftAuthApi.minecraft_auth(userhash, xsts)
    mc_json = JSON.parse(mc_auth.body)
    raise "Missing Minecraft JWT" unless mcjwt = mc_json["access_token"]
    profile_info = BaseApi.get("https://api.minecraftservices.com/minecraft/profile", headers: {'Authorization' => "Bearer #{mcjwt}"})
    profile_json = JSON.parse(profile_info.body)
    raise "Error retrieving profile" unless profile_info.is_a? Net::HTTPSuccess
    update!(xsts: xsts, mcjwt: mcjwt, username: profile_json["name"], uuid: profile_json["id"], skin: profile_json.dig("skins", 0, "url"))
  end
end