require_relative "../lib/needcoolershoes/config"

Needcoolershoes::Config.setup do |config|
  config.host = "needcoolershoes.com"
  config.shortener_host = "ncrs.skin"
  config.source = "https://github.com/NeedCoolerShoes/needcoolershoes"
  config.signups_disabled = ENV["NCRS_DISABLE_SIGNUPS"].present?
  config.require_authentication_for_gallery_filters = ENV["NCRS_REQUIRE_GALLERY_FILTER_AUTH"]
end