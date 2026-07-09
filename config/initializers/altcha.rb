Altcha.setup do |config|
  use_test_key = Rails.env.development? || ENV["SECRET_KEY_BASE_DUMMY"].present?

  config.hmac_key         = use_test_key ? "test-secret-key" : ENV.fetch('ALTCHA_HMAC_KEY')
  config.algorithm        = 'SHA-256'             # default
  config.max_number       = 1_100_000             # difficulty: upper bound for the proof-of-work nonce. default 1_000_000
  config.timeout          = 5.minutes             # default 300 seconds; accepts integers or ActiveSupport durations
  config.cache_key_prefix = 'altcha:solution:'    # default; prepended to the Rails.cache key used for replay protection
end