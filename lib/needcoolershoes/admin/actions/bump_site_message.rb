module Needcoolershoes
  module Admin
    module Actions
      class BumpSiteMessage < RailsAdmin::Config::Actions::Base
        register_instance_option :member do
          true
        end

        register_instance_option :visible? do
          subject = bindings[:object]
          subject.is_a? SiteMessage
        end

        register_instance_option :link_icon do
          'fa-solid fa-angles-up'
        end

        register_instance_option :controller do
          proc do
            @object.bump!


            respond_to do |format|
              format.html { redirect_to_on_success }
              format.js { render @action.template_name, layout: 'rails_admin/modal', content_type: Mime[:html].to_s }
            end
          end
        end
      end
    end
  end
end