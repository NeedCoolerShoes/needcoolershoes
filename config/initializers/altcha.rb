Altcha.setup do |config|
  config.hmac_key         = Rails.env.development? ? "test-secret-key" : ENV.fetch('ALTCHA_HMAC_KEY')
  config.algorithm        = 'SHA-256'             # default
  config.max_number       = 2_000_000             # difficulty: upper bound for the proof-of-work nonce. default 1_000_000
  config.timeout          = 5.minutes             # default 300 seconds; accepts integers or ActiveSupport durations
  config.cache_key_prefix = 'altcha:solution:'    # default; prepended to the Rails.cache key used for replay protection
end