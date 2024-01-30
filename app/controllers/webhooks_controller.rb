class WebhooksController < ApplicationController
  before_action :authenticate_user!, only: %i[minecraftauth]

  def minecraftauth
    return redirect_to(root_path, alert: "#{params[:error].to_s.titleize}: #{params[:error_description]}") if params[:error]
    return redirect_to(root_path, alert: "Unexpected Error: missing auth code") unless params[:code]
    account = MinecraftAccount.create_or_update(current_user, params[:code])
    account.update_profile!
    redirect_to root_path, notice: "Minecraft account linked successfully!"
  # rescue StandardError => e
  #   redirect_to root_path, alert: "Unexpected Error: #{e.message}"
  end
end
