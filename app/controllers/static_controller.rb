class StaticController < ApplicationController
  def editor
  end

  def banner
  end

  def about
    render layout: "application"
  end

  def sitemap
  end
end