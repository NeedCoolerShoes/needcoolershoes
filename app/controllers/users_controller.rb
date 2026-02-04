class UsersController < ApplicationController
  before_action :authenticate_user!, only: %i[edit update export]
  before_action :set_user, only: %i[show edit moderator_edit update moderator_update export]
  before_action :validates_current_user, only: %i[edit update export]

  require_role :moderator, only: %i[moderator_edit moderator_update]

  def redirect
    name = URI.encode_uri_component(params[:id].to_s)
    redirect_to("/@#{name}", status: :moved_permanently)
  end

  def show
    name = (params[:user_id] || params[:id]).to_s.delete_prefix("@")
    return redirect_to("/@#{@user.name}") if @user.name != name

    meta_config do |config|
      config.title = "#{@user.display_name}'s Profile".truncate(32)
      config.description = @user.biography&.tr("\n", " ")&.strip || "#{@user.display_name}'s Profile. User of NeedCoolerShoes minecraft skin editor and gallery. Create, share and remix high quality skins using our easy to use editor."
    end
  end

  def edit
    meta_config { |config| config.title = "Editing Profile".truncate(32) }
  end

  def moderator_edit
  end

  def current
    if current_user.present?
      redirect_to current_user.to_path
    else
      redirect_to root_path
    end
  end

  def update
    respond_to do |format|
      valid = false

      ActiveRecord::Base.transaction do
        old_name = @user.name
        valid = @user.update(user_params)

        if (valid && user_params["name"] && user_params["name"] != old_name)
          UsernameRecord.create(user: @user, name: old_name).save
        end
      end

      if valid
        format.html { redirect_to user_path(params[:id]), notice: "User updated successfully!" }
      else
        format.html { redirect_to user_path(params[:id]), alert: format_errors(@user.errors.messages) }
      end
    end
  end

  def moderator_update
    old_attr = @user.attributes
    reason = params[:reason]
    respond_to do |format|
      user, modlog = nil
      ActiveRecord::Base.transaction do
        user = @user.update(user_params)
        new_attr = @user.reload.attributes
        modlog = Modlog.generate!(@user, current_user, old_attr, new_attr, reason)
      end
      raise "Error saving skin or modlog" unless skin && modlog

      format.html { redirect_to user_path(@user), notice: "User updated successfully!" }
    rescue
      format.html { redirect_to user_path(@user), alert: "Error updating user!" }
    end
  end

  def export
    send_file @user.export_skins_to_zip, filename: "#{@user.name}_#{Date.today.strftime "%Y%m%d"}.zip"
  end

  private

  def set_user
    name = (params[:user_id] || params[:id]).to_s.delete_prefix("@")

    user = User.lookup(name)
    if user.present?
      @user = user
    else
      not_found_error
    end
  end

  def validates_current_user
    return true if @user.can_user_edit?(current_user)
    redirect_to root_path, alert: "You cannot edit another user."
  end

  def user_params
    params.except(:reason).require(:user).permit(:name, :display_name, :biography, :featured_skin_id, :featured_badge_id, :password, :password_confirmation, :attribution_message, :watermark_disabled)
  end
end
