# frozen_string_literal: true

class MinecraftAccountComponent < ViewComponent::Base
  def initialize(minecraft_account:, skin: nil)
    @minecraft_account = minecraft_account
    @skin = skin
  end

  def has_skin?
    @skin.present?
  end

  def can_set_skin?
    @minecraft_account.can_set_skin?(@skin)
  end

  def texture
    @minecraft_account.texture
  end

  def name
    @minecraft_account.username
  end

  def uuid
    @minecraft_account.uuid
  end

  def status
    @minecraft_account.status.titleize
  end

  def authenticated?
    @minecraft_account.authenticated?
  end

  def user
    @minecraft_account.user
  end

  def primary?
    @minecraft_account.primary?
  end
end
