class Discord::SiteMessageWebhook
  require "discordrb/webhooks"
  WEBHOOK_URL = ENV["SITE_MESSAGE_WEBHOOK"]

  class << self
    include Routing
    def client
      @@client ||= Discordrb::Webhooks::Client.new(url: WEBHOOK_URL)
    end

    def send_webhook(name: "", contact: "", title: "", message: "")
      client.execute do |builder|
        builder.add_embed do |embed|
          embed.title = title.to_s
          embed.color = "#f69901"
          
          embed.add_field(
            name: "From:",
            value: name.to_s,
            inline: true
          )
          embed.add_field(
            name: "Contact:",
            value: contact.to_s,
            inline: true
          )
          embed.add_field(
            name: "~~                  ~~",
            value: message.to_s
          )

          embed.timestamp = Time.now
        end
      end
    end
  end
end
