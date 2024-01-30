class BaseApi
  require "net/http"

  class << self
    def get(url, headers: {})
      uri = URI(url)
      https = Net::HTTP.new(uri.host, 443)
      https.use_ssl = true
      request = Net::HTTP::Get.new(uri.request_uri)
      headers.each {|header, value| request[header] = value }
      https.request(request)
    end

    def post(url, body: "", headers: {})
      Net::HTTP.post URI(url), body, headers
    end

    def post_form(url, params: {})
      Net::HTTP.post_form URI(url), params.transform_keys {|key| key.to_s}
    end
  end
end