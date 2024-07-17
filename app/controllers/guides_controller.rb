class GuidesController < ApplicationController
  def index
  end

  def embeds
    meta_config do |config|
      config.title = "Working with Embeds"
      config.description = "How to embed minecraft skins from NeedCoolerShoes, in to your own website."
    end
  end
end
