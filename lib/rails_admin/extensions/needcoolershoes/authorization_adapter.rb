module RailsAdmin
  module Extensions
    module Needcoolershoes
      class AuthorizationAdapter
        attr_reader :controller

        delegate :current_user, to: :controller

        MODERATOR_ACCESSIBLE = %w[Badge UserBadge SiteMessage BlockedEmailDomain]

        def initialize(controller)
          @controller = controller
        end

        # This method is called in every controller action and should raise an
        # exception when the authorization fails. The first argument is the name
        # of the controller action as a symbol (:create, :bulk_delete, etc.).
        # The second argument is the AbstractModel instance that applies. The
        # third argument is the actual model instance if it is available.
        def authorize(action, abstract_model = nil, model_object = nil)
          return if authorized?(action, abstract_model, model_object)

          raise ActionController::RoutingError, 'Not Found'
        end

        # This method is called primarily from the view to determine whether the
        # given user has access to perform the action on a given model. It
        # should return true when authorized. This takes the same arguments as
        # +authorize+. The difference is that this will return a boolean whereas
        # +authorize+ will raise an exception when not authorized.
        def authorized?(action, abstract_model = nil, model_object = nil)
          return false unless current_user.present?

          # Admins can access everything
          return true if current_user.authorized?(:admin)

          record = model_object&.model_name&.name || abstract_model&.model_name
          moderator_accessible = MODERATOR_ACCESSIBLE.include?(record) || record.blank?
          
          return moderator_accessible if current_user.authorized?(:moderator)

          false
        end

        # This is called when needing to scope a database query. It is called
        # within the list and bulk_delete/destroy actions and should return a
        # scope which limits the records to those which the user can perform the
        # given action on.
        def query(_action, abstract_model)
          # No query restrictions for now
          abstract_model.model.all
        end

        # This is called in the new/create actions to determine the initial
        # attributes for new records. It should return a hash of attributes
        # which match what the user is authorized to create.
        def attributes_for(_action, _abstract_model)
          # No attribute restrictions for now
          {}
        end
      end
    end
  end
end