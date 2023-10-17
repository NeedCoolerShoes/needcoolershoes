class Discord::SiteMessageRequestWebhook
  require "discordrb/webhooks"
  WEBHOOK_URL = ENV["SITE_MESSAGE_REQUEST_WEBHOOK"]
  
  class << self
    include Routing
    def client
      @@client ||= Discordrb::Webhooks::Client.new(url: WEBHOOK_URL)
    end

    def send_webhook(request)
      return unless request.is_a? ActionDispatch::Request
      client.execute do |builder|
        builder.add_embed do |embed|
          embed.title = "From: #{request.headers["X-Forwarded-For"] || request.remote_ip}"
          embed.description = "#{request.headers["USER-AGENT"]}\n#{request.body.string}"
          embed.timestamp = Time.now
        end
      end
    end
  end
end