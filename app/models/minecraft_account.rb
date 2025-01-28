class MinecraftAccount < ApplicationRecord
  belongs_to :user
  
  encrypts :minecraft_token
  encrypts :refresh_token

  enum :status, %i[authenticated expired]
end
