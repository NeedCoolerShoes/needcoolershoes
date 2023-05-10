class UsersController < ApplicationController
  before_action :authenticate_user!, only: %i[update]
  before_action :set_user, only: %i[show]

  def show
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
      if current_user.update(profile_params)
        format.html { redirect_to current_user_path, notice: "Profile updated successfully!" }
      else
        format.html { redirect_to current_user_path, alert: "Error updating profile!" }
      end
    end
  end

  private

  def set_user
    @user = User.find_by!(name: params[:id])

  rescue ActiveRecord::RecordNotFound
    redirect_to root_path 
  end

  def profile_params
    params.require(:user).permit(:display_name, :biography, :featured_skin_id)
  end
end