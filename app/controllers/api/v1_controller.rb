module Api
  class V1Controller < ApplicationController
    before_action -> { authorize! }, only: :profile
    respond_to    :json

    def profile
      return forbidden_error unless @user.present?

      render partial: "users/user_authenticated", locals: { user: @user }, formats: :json
    end

    private

    def current_resource_owner
      User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
    end

    def authorize!
      if current_user.present?
        @user = current_user
      else
        doorkeeper_authorize! :read
        @user = current_resource_owner
      end
    end
  end
end