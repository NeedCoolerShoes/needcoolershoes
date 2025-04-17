Rails.application.config.middleware.insert_before 0, Rack::Cors do
  if Rails.env.development?
    allow do
      origins "*"

      resource "*",
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end

  allow do
    origins "beta.needcoolershoes.com"

    resource "*",
      headers: :any,
      methods: [:get, :options, :head]
  end
end
