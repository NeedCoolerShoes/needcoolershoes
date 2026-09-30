require_relative "../../lib/needcoolershoes/admin/actions/bump_site_message"
require_relative "../../lib/needcoolershoes/admin/types/user_name_type"

require_relative "../../lib/rails_admin/extensions/needcoolershoes/authorization_adapter"

def excluded_classes
  classes = SolidQueue.constants.map(&SolidQueue.method(:const_get)).grep(Class)
  classes += SolidCache.constants.map(&SolidCache.method(:const_get)).grep(Class)
  classes += SolidCable.constants.map(&SolidCable.method(:const_get)).grep(Class)

  classes
end

RailsAdmin.add_extension(:needcoolershoes, RailsAdmin::Extensions::Needcoolershoes, authorization: true)

RailsAdmin.config do |config|
  RailsAdmin::Config::Actions.register(
    Needcoolershoes::Admin::Actions::BumpSiteMessage
  )

  config.asset_source = :importmap

  ### Popular gems integration

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == CancanCan ==
  # config.authorize_with :cancancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/railsadminteam/rails_admin/wiki/Base-configuration

  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  config.actions do
    dashboard # mandatory
    index # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app
    bump_site_message

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.excluded_models += excluded_classes

  # config.authorize_with do |controller|
  #   puts controller
  #   redirect_to main_app.root_path unless current_user&.authorized?(:admin)
  # end
  config.authorize_with :needcoolershoes

  # Configure description fields to use markdown
  %w[Badge Banner Skin SkinJam].each do |model_name|
    config.model(model_name) { configure :description, :markdown }
  end

  %w[User SkinPart SkinCategory].each do |model_name|
    config.model(model_name) { configure(:skins) { hide } }
  end

  config.model "MinecraftAccount" do
    configure(:minecraft_token) { hide }
    configure(:refresh_token) { hide }
  end

  config.model "User" do
    configure :biography, :markdown
    exclude_fields :password, :password_confirmation

    object_label_method do
      :admin_label_name
    end

    field "name_length", :user_name do
      hide
      formatted_value { bindings[:object].name }
      sort_reverse false
      sortable true
    end

    list do
      search_by :search_by_name
    end
  end

  config.model "SiteMessage" do
    configure :message, :markdown
    list do
      sort_by :bumped_at
    end
  end
end

Rails.configuration.after_initialize do
  RailsAdmin.config.models_pool.each do |model|
    RailsAdmin.config.model model do
      next if model == "ApplicationRecord"

      field_names = all_fields.map {|f| f.name }
      next unless field_names.include?(:user)

      edit do
        configure :user do
          partial "form_filtering_select_user_name"
        end
      end
      # if parent.attribute_names.include?(:user_id)        
      # end
    end
  end
end