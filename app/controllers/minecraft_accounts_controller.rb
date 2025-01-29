class MinecraftAccountsController < ApplicationController
  before_action :set_user
  before_action :validate_user
  before_action :set_minecraft_account, only: %i[destroy]

  def index
    @minecraft_accounts = @user.minecraft_accounts.order_by_primary
  end

  def connect
    client_id = ENV["MS_AZURE_CLIENT_ID"]
    redirect_uri = minecraft_auth_webhook_url

    url = "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize"
    url << "?client_id=#{client_id}"
    url << "&redirect_uri=#{redirect_uri}"
    url << "&response_type=code&response_mode=query&scope=XboxLive.signin%20offline_access&prompt=select_account"

    redirect_to(url, allow_other_host: true)
  end

  def destroy
    @minecraft_account.destroy
    respond_to do |format|
      format.html { redirect_to user_accounts_path(@user), notice: "Minecraft account was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def set_user
    name = (params[:user_id]).to_s.delete_prefix("@")

    @user = User.find_by!(name: name)
  rescue ActiveRecord::RecordNotFound
    not_found_error
  end

  def validate_user
    return if @user == current_user
    
    forbidden_error
  end

  def set_minecraft_account
    @minecraft_account = @user.minecraft_accounts.find(params[:id])

  rescue ActiveRecord::RecordNotFound
    not_found_error
  end
end
