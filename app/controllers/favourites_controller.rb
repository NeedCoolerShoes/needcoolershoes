class SkinsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_favourite, only: :destroy

  def create
    @favourite = Favourite.new(favourite_params)

    respond_to do |format|
      if @favourite.save
        format.html { redirect_to gallery_path, notice: "Skin was successfully created." }
      else
        format.html { redirect_to root_path, alert: "Error saving skin." }
      end
    end
  end

  def destroy
    @favourite.destroy
    respond_to do |format|
      format.html { redirect_to gallery_path, notice: "Skin was successfully removed from favourites." }
      format.json { head :no_content }
    end
  end

  private

  def set_favourite
    @favourite = Favourite.find(params[:id])

  rescue ActiveRecord::RecordNotFound
    redirect_to gallery_path 
  end
end