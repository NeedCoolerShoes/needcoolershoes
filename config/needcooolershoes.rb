require_relative "../lib/needcoolershoes/config"

Needcoolershoes::Config.setup do |config|
  config.host = "needcoolershoes.com"
  config.source = "https://github.com/NeedCoolerShoes/needcoolershoes"
end