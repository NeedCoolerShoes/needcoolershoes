Rails.application.routes.draw do
  root "static#editor"

  mount RailsAdmin::Engine => "/admin", :as => "rails_admin"
  devise_for :users, controllers: {sessions: "sessions"}
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  get "about", to: "static#about", as: "about"
  get "faq", to: "static#faq", as: "faq"
  get "contact", to: "static#contact", as: "contact"
  get "donate", to: "static#donate", as: "donate"
  post "contact", to: "static#send_message", as: "send_message"
  get "open-letter", to: "static#open_letter"
  get "open_letter", to: redirect("open-letter")
  get "rules", to: "static#rules"
  get "sitemap", to: "static#sitemap", defaults: {format: "xml"}

  # Gallery Routes
  get "gallery/banners", to: "banners#index", as: "banners_gallery"
  get "gallery/banners/:page", to: "banners#index"
  get "gallery/skins", to: "skins#index", as: "skins_gallery"
  get "gallery/skins/:page", to: "skins#index"
  get "gallery", to: redirect(path: "/gallery/skins")
  get "gallery/:page", to: redirect("/gallery/skins/%{page}")

  get "jam/:jam", to: redirect("/gallery/skins/?tag=%{jam}")

  get "skins", to: redirect("/gallery/skins")
  get "skins/random", to: "skins#random", as: "random_skin"
  get "skins/:id/download", to: "skins#download", as: "skin_download"
  get "skins/:id/texture", to: "skins#texture", as: "skin_texture"
  get "skins/:id/social", to: "skins#social", as: "skin_social"
  get "skins/:id/embed", to: "skins#embed", as: "skin_embed"
  get "skins/:id/moderate", to: "skins#moderator_edit", as: "skin_moderate"
  get "skins/:id/upload-to-minecraft", to: "skins#minecraft_upload", as: "skin_minecraft_upload"
  post "skins/:id/favourite", to: "skins#add_favourite", as: "create_skin_favourite"
  post "skins/:id/upload-to-mineskin", to: "skins#mineskin_upload", as: "skin_mineskin_upload"
  patch "skins/:id/moderate", to: "skins#moderator_update", as: "update_skin_moderate"
  post "skins/:id/moderate/:action_id", to: "skins#quick_action", as: "skin_quick_action"
  patch "skins/:id/moderate/:action_id", to: "skins#quick_action"
  delete "skins/:id/favourite", to: "skins#remove_favourite", as: "destroy_skin_favourite"
  resources :skins, only: %i[create show edit destroy update]

  get "banners/random", to: "banners#random", as: "random_banner"
  post "banners/:id/favourite", to: "banners#add_favourite", as: "create_banner_favourite"
  delete "banners/:id/favourite", to: "banners#remove_favourite", as: "destroy_banner_favourite"

  scope :banner do
    get "/", to: "banners#new", as: "banner_editor"
    get "2014", to: "banners#banner_2014", as: "banner_2014"
  end

  scope :banners do
    get "/:id/moderate", to: "banners#moderator_edit", as: "banner_moderate"
    patch "/:id/moderate", to: "banners#moderator_update", as: "update_banner_moderate"
  end
  
  resources :banners, except: [:new, :index]

  constraints(title: /~[a-z0-9\-]*/) do
    get "banners/:id/:title", to: "banners#show", as: "banner_title"
    get "skins/:id/:title", to: "skins#show", as: "skin_title"
  end

  constraints(id: /@[a-z0-9_\-]+/) do
    get ":id", to: "users#show"
  end

  get "users", to: redirect("/")
  get "users/current", to: "users#current", as: "current_user"
  patch "profile", to: "users#update", as: "update_profile"

  get "modlog", to: "site#modlog", as: "modlog"
  get "preview", to: "site#preview", as: "preview"

  scope :webhooks do
    get "minecraftauth", to: "webhooks#minecraftauth", as: "minecraft_auth_webhook"
  end

  scope :terms do
    # get "/", to: "static#tos"
    get "/", to: redirect("/rules")
    get "mncs-archive", to: "static#mncs_terms", as: "mncs_terms"
    get "mncs_archive", to: redirect("/terms/mncs-archive")
  end

  scope :guides do
    get "/", to: "guides#index", as: "guides"
    get "working-with-embeds", to: "guides#embeds", as: "embeds_guide"
    get "creating-your-first-skin", to: "guides#editor", as: "editor_guide"
  end

  get "badges", to: redirect("/hall-of-fame"), as: ""
  get "hall-of-fame", to: "badges#index", as: "badges"
  resources :badges, except: :index

  scope :users do
    get ":id", to: "users#redirect"
    resource :otp, controller: "otp", only: %i[update destroy] do
      get "backup-codes", to: "otp#backup_codes", as: "backup_codes"
      get "verify"
    end
    get ":id/moderate", to: "users#moderator_edit", as: "edit_profile_moderate"
    patch ":id/moderate", to: "users#moderator_update", as: "update_profile_moderate"
  end

  resources :users, only: %i[edit destroy update] do
    get "export", to: "users#export"
    
    get "accounts/connect", to: "minecraft_accounts#connect"
    post "accounts/:id/make_primary", to: "minecraft_accounts#make_primary", as: "make_account_primary"
    post "accounts/:id/change_skin", to: "minecraft_accounts#change_skin", as: "change_account_skin"
    post "accounts/:id/refresh", to: "minecraft_accounts#refresh", as: "refresh_account"
    resources :minecraft_accounts, only: %i[index destroy], path: "accounts", as: "accounts"
  end

  scope :editor do
    get "/", to: redirect("/")
    get "2010", to: "static#editor_2010", as: "editor_2010"
  end

  # API
  scope :api do
    get "skin/:id", to: "api#skin"
    get "tags", to: "api#tags"
    get "outdated_browser", to: "api#outdated_browser_bypass"
  end
end
