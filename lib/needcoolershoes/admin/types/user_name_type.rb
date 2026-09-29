require "rails_admin/config/fields/types"

class UserNameType < RailsAdmin::Config::Fields::Base
  def sort_column
    "length(name)"
  end
end

RailsAdmin::Config::Fields::Types::register(:user_name, UserNameType)