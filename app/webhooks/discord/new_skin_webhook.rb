class Discord::NewSkinWebhook
  require "discordrb/webhooks"
  WEBHOOK_URL = ENV["NEW_SKIN_WEBHOOK"]

  class << self
    include Routing

    def client
      @@client ||= Discordrb::Webhooks::Client.new(url: WEBHOOK_URL)
    end

    def send_webhook(skin)
      raise "Is not a skin" unless skin.is_a? Skin
      client.execute do |builder|
        builder.add_embed do |embed|
          embed.title = "New Skin: **#{skin.name}** by **#{skin.user.name}**."
          embed.description = "[Link to skin](#{skin_url(skin)})\n#{skin.description}"
          embed.timestamp = skin.created_at
          embed.image = Discordrb::Webhooks::EmbedImage.new(url: skin_url(skin, format: :png))
        end
      end
    end
  end
end
