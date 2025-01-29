class MinecraftAccount < ApplicationRecord
  belongs_to :user
  has_one :user_set_primary, class_name: "User", dependent: :nullify
  
  encrypts :minecraft_token
  encrypts :refresh_token

  enum :status, %i[authenticated expired]

  scope :secondary, -> { includes(:user_set_primary).where(user_set_primary: {id: nil}) }
  scope :order_by_primary, -> { left_outer_joins(:user_set_primary).order("users.id ASC") }

  def set_skin(skin)
    return unless skin.is_a? Skin

    if skin.minecraft_texture_url?
      return unless can_set_skin?(skin)

      response = try_change_skin(minecraft_token, skin.minecraft_texture_url, skin.model)
    else
      response = try_upload_skin(minecraft_token, skin.to_png, skin.model)
    end

    raise "Failed to update skin" if !response

    json = JSON.parse(response.to_s)
    texture = json.dig("skins", 0, "url")

    if texture.present?
      skin.update(minecraft_texture_url: texture) if !skin.minecraft_texture_url?
      update(texture: texture)
    end
  end

  def can_set_skin?(skin)
    return true unless skin.minecraft_texture_url?

    skin.minecraft_texture_url == texture
  end

  def primary?
    user_set_primary.present?
  end

  def make_primary!
    return true if user_set_primary.present?

    user.update!(minecraft_account: self)
  end

  private

  def try_change_skin(token, url, variant, retried = false)
    response = MinecraftApi.change_skin(token, url, variant)

    return response if response.code == 200
    raise "Unknown error" if response.code != 401
    raise "Failed to refresh minecraft account" if retried

    _, new_minecraft_token = refresh!

    try_change_skin(new_minecraft_token, url, variant, true)
  rescue => error
    update(status: :expired)
    false
  end


  def try_upload_skin(token, data, variant, retried = false)
    response = MinecraftApi.upload_skin(token, data, variant)

    return response if response.code == 200
    raise "Unknown error" if response.code != 401
    raise "Failed to refresh minecraft account" if retried

    _, new_minecraft_token = refresh!

    try_upload_skin(new_minecraft_token, data, variant, true)
  rescue => error
    update(status: :expired)
    false
  end

  def refresh!
    client = MinecraftAuthWebhook.new
    new_refresh_token, new_minecraft_token = client.refresh(refresh_token)

    mc_expires_at = Time.current + 24.hours

    update!(
      refresh_token: new_refresh_token, minecraft_token: new_minecraft_token,
      status: :authenticated, minecraft_token_expires_at: mc_expires_at
    )

    return new_refresh_token, new_minecraft_token
  end
end
