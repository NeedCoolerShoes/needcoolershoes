class UsersController < ApplicationController
  before_action :set_user, only: %i[show]

  def show
  end

  private

  def set_user
    @user = User.find(params[:id])

  rescue ActiveRecord::RecordNotFound
    redirect_to root_path 
  end
end