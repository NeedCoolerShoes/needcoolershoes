class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def to_short_url(shortpath = nil)
    return Routing.url_for(self) unless (shortpath.present? && Needcoolershoes::Config.shortener_host?)

    "https://" + (Needcoolershoes::Config.shortener_host + shortpath).squeeze("/")
  end
end
