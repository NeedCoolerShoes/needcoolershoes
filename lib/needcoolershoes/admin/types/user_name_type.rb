require "rails_admin/config/fields/types"

module Needcoolershoes
  module Admin
    module Types
      class UserNameType < RailsAdmin::Config::Fields::Base
        def sort_column
          "length(name)"
        end
      end
      
      RailsAdmin::Config::Fields::Types::register(:user_name, UserNameType)
    end
  end
end
