class MinecraftAccountsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user
  before_action :validate_user
  before_action :set_minecraft_account, only: %i[destroy change_skin]
  before_action :set_skin, only: %i[change_skin]

  def index
    @minecraft_accounts = @user.minecraft_accounts.order_by_primary
  end

  def connect
    client_id = ENV["MS_AZURE_CLIENT_ID"]
    redirect_uri = minecraft_auth_webhook_url
    ncrs_redirect_url = params[:redirect] || user_accounts_url(current_user)

    url = "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize"
    url << "?client_id=#{client_id}"
    url << "&redirect_uri=#{redirect_uri}"
    url << "&state=#{form_authenticity_token}~#{ncrs_redirect_url}"
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

  def make_primary
    @minecraft_account.make_primary!

    respond_to do |format|
      format.html { redirect_to user_accounts_path(@user), notice: "Primary account has been updated." }
    end
  end

  def change_skin
    @minecraft_account.set_skin(@skin)

    respond_to do |format|
      format.html { redirect_to skin_minecraft_upload_path(@skin), notice: "Skin has been changed for account #{@minecraft_account.username}." }
    end

  rescue => error
    redirect_to skin_minecraft_upload_path(@skin), alert: "Unexpected error: #{error.message}"
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

  def set_skin
    @skin = Skin.visible_to_user(@user).find(params[:skin_id])

  rescue ActiveRecord::RecordNotFound
    not_found_error
  end
end
