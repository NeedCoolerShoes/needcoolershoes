Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "*"

    resource "/gallery/*",
      headers: :any,
      methods: [:get, :options, :head]
  end
end
