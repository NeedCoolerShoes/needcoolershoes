class MinecraftAuthWebhook
  DEFAULT_STEVE="http://textures.minecraft.net/texture/d5c4ee5ce20aed9e33e866c66caa37178606234b3721084bf01d13320fb2eb3f"

  def call(user, code)
    refresh_token, minecraft_token = authenticate(code)
    create_or_update_record(user, refresh_token, minecraft_token)
  end

  def authenticate(code)
    ms_auth = get_ms_auth(code)
    access_token = ms_auth["access_token"]
    refresh_token = ms_auth["refresh_token"]

    xbox_auth = get_xbl_auth(access_token)
    xbl_token = xbox_auth["Token"]

    xsts_auth = get_xsts_auth(xbl_token)
    xsts_userhash = xsts_auth["DisplayClaims"]["xui"][0]["uhs"]
    xsts_token = xsts_auth["Token"]

    minecraft_auth = get_mc_auth(xsts_userhash, xsts_token)
    minecraft_token = minecraft_auth["access_token"]

    return refresh_token, minecraft_token
  end

  private

  def get_ms_auth(code)
    response = MinecraftAuthApi.ms_auth(ENV["MS_AZURE_CLIENT_ID"], ENV["MS_AZURE_CLIENT_SECRET"], code, Routing.minecraft_auth_webhook_url)
    JSON.parse(response.body)
  end

  def get_xbl_auth(access_token)
    response = MinecraftAuthApi.xbox_auth(access_token)
    JSON.parse(response.body)
  end

  def get_xsts_auth(xbl_token)
    response = MinecraftAuthApi.xsts_auth(xbl_token)
    JSON.parse(response.body)
  end

  def get_mc_auth(userhash, token)
    response = MinecraftAuthApi.minecraft_auth(userhash, token)
    JSON.parse(response.body)
  end

  def get_mc_profile(minecraft_token)
    response = MinecraftAuthApi.minecraft_profile(minecraft_token)
    JSON.parse(response.body)
  end

  def create_or_update_record(user, refresh_token, minecraft_token)
    profile = get_mc_profile(minecraft_token)
    uuid = profile["id"]
    username = profile["name"]

    texture = profile.dig("skins", 0, "url") || DEFAULT_STEVE

    mc_expires_at = Time.current + 24.hours
    
    account = user.minecraft_accounts.find_by(uuid: uuid)

    if account.present?
      account.update(
        username: username, refresh_token: refresh_token, minecraft_token: minecraft_token,
        minecraft_token_expires_at: mc_expires_at, texture: texture, status: :authenticated
      )
    else
      account = MinecraftAccount.create(
        user: user, username: username, uuid: uuid, refresh_token: refresh_token,
        minecraft_token: minecraft_token, minecraft_token_expires_at: mc_expires_at,
        texture: texture, status: :authenticated
      )
      return account if user.minecraft_account.present?

      user.update(minecraft_account: account)
      account
    end
  end
end