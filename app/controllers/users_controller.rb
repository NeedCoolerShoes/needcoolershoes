class UsersController < ApplicationController
  before_action :authenticate_user!, only: %i[edit update export]
  before_action :set_user, only: %i[show edit update export]
  before_action :validates_current_user, only: %i[edit update export]

  def show
  end

  def edit
  end

  def current
    if current_user.present?
      redirect_to current_user
    else
      redirect_to root_path
    end
  end

  def update
    respond_to do |format|
      if current_user.update(user_params)
        format.html { redirect_to current_user_path, notice: "User updated successfully!" }
      else
        format.html { redirect_to current_user_path, alert: "Error updating user!" }
      end
    end
  end

  def export
    send_file @user.export_skins_to_zip, filename: "#{@user.name}_#{Date.today.strftime "%Y%m%d"}.zip"
  end

  private

  def set_user
    @user = User.find_by!(name: params[:user_id] || params[:id])

  rescue ActiveRecord::RecordNotFound
    redirect_to root_path 
  end

  def validates_current_user
    return true if @user == current_user
    redirect_to root_path, alert: "You cannot edit another user."
  end

  def user_params
    params.require(:user).permit(:display_name, :biography, :featured_skin_id, :password, :password_confirmation, :attribution_message)
  end
end