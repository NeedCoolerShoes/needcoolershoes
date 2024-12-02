module Middleware
  class CachedAssetsMiddleware
    CACHED_PATH = "/assets"
    CACHE_CONTROL = "public, max-age=30672000, immutable"

    def initialize(app)
      @app = app
    end

    def call(env)
      status, headers, body = @app.call(env)
      if env["PATH_INFO"].to_s.start_with?(CACHED_PATH)
        headers = headers.merge({"Cache-Control" => CACHE_CONTROL})
      end
      [status, headers, body]
    end
  end
end