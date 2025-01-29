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
    MinecraftApi.change_skin(minecraft_token, skin.to_png, skin.model)
  end

  def primary?
    user_set_primary.present?
  end

  def make_primary!
    return true if user_set_primary.present?

    user.update!(minecraft_account: self)
  end
end
