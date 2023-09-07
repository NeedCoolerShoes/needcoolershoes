class OtpController < ApplicationController
  before_action :authenticate_user!

  def backup_codes
    current_user.set_otp_backup_codes! unless current_user.otp_backup_codes.present?
    @backup_codes = current_user.otp_backup_codes
  end

  def verify
    if current_user.otp_enabled?
      redirect_to edit_user_registration_path, alert: "OTP is already configured."
      return false
    end
    current_user.set_otp_secret! unless current_user.otp_secret.present?
    @otp_secret = current_user.otp_secret
    @otp_barcode = current_user.otp_qrcode_svg
    @user = current_user
  end

  def update
    respond_to do |format|
      if current_user.enable_otp!(otp_params[:otp_attempt])
        format.html { redirect_to edit_user_registration_path, notice: "OTP enabled successfully." }
      else
        format.html { redirect_to verify_otp_path, alert: "One-time Password was incorrect!" }
      end
    end
  end

  def destroy
    respond_to do |format|
      if current_user.disable_otp!
        format.html { redirect_to edit_user_registration_path, notice: "OTP disabled successfully." }
      else
        format.html { redirect_to edit_user_registration_path, notice: "Error disabling OTP." }
      end
    end
  end

  private

  def otp_params
    params.require(:otp).permit(:otp_attempt)
  end
end