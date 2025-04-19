require_relative "../../lib/needcoolershoes/admin/actions/bump_site_message"

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

  config.authorize_with do
    redirect_to main_app.root_path unless current_user&.authorized?(:admin)
  end

  # Configure description fields to use markdown
  %w[Badge Banner Skin SkinJam].each do |model_name|
    config.model(model_name) { configure :description, :markdown }
  end

  %w[Users SkinPart SkinCategory].each do |model_name|
    config.model(model_name) { configure(:skins) { hide } }
  end

  config.model "MinecraftAccount" do
    configure(:minecraft_token) { hide }
    configure(:refresh_token) { hide }
  end

  config.model "User" do
    configure :biography, :markdown
  end

  config.model "SiteMessage" do
    configure :message, :markdown
    list do
      sort_by :bumped_at
    end
  end
end
