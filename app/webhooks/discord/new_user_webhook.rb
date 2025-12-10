class Discord::NewUserWebhook
  require "discordrb/webhooks"
  WEBHOOK_URL = ENV["NEW_USER_WEBHOOK"]

  class << self
    include Routing

    def client
      @@client ||= Discordrb::Webhooks::Client.new(url: WEBHOOK_URL)
    end

    def format_email(email)
      parts = email.to_s.split("@")
      return email if parts.size < 1

      parts[0] = parts[0].gsub(/.{1}/, "\\*") + "@"

      parts.join
    end

    def send_webhook(name, email, captcha)
      client.execute do |builder|
        builder.add_embed do |embed|
          embed.title = "New User: **#{name}**"
          embed.description = "Email: #{format_email(email)}\nCaptcha: #{captcha}"
          embed.timestamp = Time.current
        end
      end
    end
  end
end
