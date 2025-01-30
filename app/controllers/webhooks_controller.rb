class WebhooksController < ApplicationController
  before_action :authenticate_user!, only: %i[minecraftauth]
  protect_from_forgery with: :null_session

  def minecraftauth
    return redirect_to(root_path, alert: "#{params[:error].to_s.titleize}: #{params[:error_description]}") if params[:error]
    return redirect_to(root_path, alert: "Unexpected Error: missing auth code") unless params[:code]
    return redirect_to(root_path, alert: "Unexpected Error: missing state") unless params[:state]

    token, redirect = params[:state].split("~")
    return redirect_to(root_path, alert: "Unexpected Error: invalid authenticity token") unless valid_authenticity_token?(session, token)
    
    MinecraftAuthWebhook.new.call(current_user, params[:code])

    redirect_to redirect, notice: "Minecraft account linked successfully!"
  rescue StandardError => e
    redirect_to root_path, alert: "Unexpected Error: #{e.message}"
  end
end