class MinecraftAuthApi < BaseApi
  require "jwt"
  class << self
    def ms_auth(client_id, client_secret, code, redirect_uri)
      body = {
        client_id: client_id,
        scope: "XboxLive.signin offline_access User.Read",
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
        client_secret: client_secret
      }
      post_form("https://login.microsoftonline.com/consumers/oauth2/v2.0/token", params: body)
    end

    def ms_profile(token)
      headers = {
        "Content-Type" => "application/json",
        "Accept" => "application/json",
        "Authorization" => "Bearer #{token}"
      }
      get("https://graph.microsoft.com/v1.0/me", headers: headers)
    end

    def xbox_auth(token)
      body = {
        "Properties" => {
          "AuthMethod" => "RPS",
          "SiteName" => "user.auth.xboxlive.com",
          "RpsTicket" => "d=#{token}"
        },
        "RelyingParty" => "http://auth.xboxlive.com",
        "TokenType" => "JWT"
      }
      headers = {
        "Content-Type" => "application/json",
        "Accept" => "application/json"
      }
      post("https://user.auth.xboxlive.com/user/authenticate", body: body.to_json, headers: headers)
    end

    def xsts_auth(code)
      body = {
        "Properties" => {
          "SandboxId" => "RETAIL",
          "UserTokens" => [code]
        },
        "RelyingParty" => "rp://api.minecraftservices.com/",
        "TokenType" => "JWT"
      }
      headers = {
        "Content-Type" => "application/json",
        "Accept" => "application/json"
      }
      post("https://xsts.auth.xboxlive.com/xsts/authorize", body: body.to_json, headers: headers)
    end

    def minecraft_auth(userhash, code)
      body = {
        "identityToken" => "XBL3.0 x=#{userhash};#{code}"
      }
      headers = {
        "Content-Type" => "application/json",
        "Accept" => "application/json"
      }
      post("https://api.minecraftservices.com/authentication/login_with_xbox", body: body.to_json, headers: headers)
    end
  end
end