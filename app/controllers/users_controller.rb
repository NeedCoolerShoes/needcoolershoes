class UsersController < ApplicationController
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

  private

  def set_user
    @user = User.find_by!(name: params[:id])

  rescue ActiveRecord::RecordNotFound
    redirect_to root_path 
  end
end