class BaseApi
  require "net/http"

  class << self
    def get(url)
      uri = URI(url)
      https = Net::HTTP.new(uri.host, 443)
      https.use_ssl = true
      request = Net::HTTP::Get.new(uri.request_uri)
      https.request(request)
    end
  end
end