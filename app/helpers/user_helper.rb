module UserHelper
  def authorized?(role, user = current_user)
    return false unless user.is_a? User
    user.authorized?(role)
  end
end