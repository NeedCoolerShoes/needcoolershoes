class Moderation::UserController < Moderation::BaseController
  before_action :set_user, only: %i[show update]

  def index
    users = get_scope.order(id: :desc)
    @pagy, @users = pagy(users, items: 24)
  end

  def show
    @scope = get_scope
  end

  def update
    case params[:update_action]
    when "approve" then return approve_user
    when "ban" then return perform_ban(params[:value])
    when "flag" then return perform_flag(params[:value])
    when "ban_email" then return ban_email(params[:value])
    when "unban_email" then return unban_email(params[:value])
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def get_scope
    case params[:status]
    when "approved" then return User.status_approved
    when "flagged" then return User.status_flagged
    when "banned" then return User.status_banned
    end

    User.status_none
  end

  def moderate(user_params, reason)
    old_attr = @user.attributes

    respond_to do |format|
      user, modlog = nil
      ActiveRecord::Base.transaction do
        user = @user.update!(user_params)
        new_attr = @user.reload.attributes
        modlog = Modlog.generate!(@user, current_user, old_attr, new_attr, reason)
      end
      raise "Error saving banner or modlog" unless user && modlog

      format.html { redirect_to user_moderation_path(@user.id, status: params[:status]), notice: "User was successfully updated." }
    rescue
      format.html { redirect_to user_moderation_path(@user.id, status: params[:status]), alert: "Error saving user." }
    end
  end

  def approve_user
    moderate({moderation_status: :approved}, "User marked as approved by manual review.")
  end

  def perform_flag(reason)
    reasons = {
      "spam" => "User flagged as potentially being created for spam purposes.",
      "tos" => "User flagged as possibly violating the site's terms of service.",
    }

    reason_msg = reasons[reason] || "User flagged with reason: #{reason}"

    moderate({moderation_status: :flagged}, reason_msg)
  end

  def perform_ban(reason)
    reasons = {
      "spam" => "User banned as it was seemingly created for spam purposes.",
      "tos" => "User banned for violating the site's terms of service.",
    }

    reason_msg = reasons[reason] || "User banned with reason: #{reason}"

    moderate({moderation_status: :banned}, reason_msg)
  end

  def ban_email(domain)
    respond_to do |format|
      if BlockedEmailDomain.create(domain: domain)
        format.html { redirect_to user_moderation_path(@user.id, status: params[:status]), notice: "Email domain has been banned." }
      else
        format.html { redirect_to user_moderation_path(@user.id, status: params[:status]), alert: "Error when banning email domain." }
      end
    end
  end

  def unban_email(domain)
    respond_to do |format|
      blocked_email = BlockedEmailDomain.find_by(domain: domain)
      
      if blocked_email && blocked_email.delete
        format.html { redirect_to user_moderation_path(@user.id), notice: "Email domain has been unbanned." }
      else
        format.html { redirect_to user_moderation_path(@user.id), alert: "Error when unbanning email domain." }
      end
    end
  end
end
