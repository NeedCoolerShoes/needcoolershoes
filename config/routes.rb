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
  get "gallery", to: "skins#index"
  get "gallery/:page", to: "skins#index"
  get "skins", to: redirect("/gallery")
  get "skins/random", to: "skins#random", as: "random_skin"
  get "skins/:id/download", to: "skins#download", as: "skin_download"
  get "skins/:id/social", to: "skins#social", as: "skin_social"
  get "skins/:id/embed", to: "skins#embed", as: "skin_embed"
  get "skins/:id/moderate", to: "skins#moderator_edit", as: "skin_moderate"
  post "skins/:id/favourite", to: "skins#add_favourite", as: "create_skin_favourite"
  patch "skins/:id/moderate", to: "skins#moderator_update", as: "update_skin_moderate"
  delete "skins/:id/favourite", to: "skins#remove_favourite", as: "destroy_skin_favourite"
  resources :skins, only: %i[create show edit destroy update]
  get "users", to: redirect("/")
  get "users/current", to: "users#current", as: "current_user"
  patch "profile", to: "users#update", as: "update_profile"

  get "modlog", to: "site#modlog", as: "modlog"
  get "preview", to: "site#preview", as: "preview"

  scope :terms do
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
    resource :otp, controller: "otp", only: %i[update destroy] do
      get "backup-codes", to: "otp#backup_codes", as: "backup_codes"
      get "verify"
    end
    get ":id/moderate", to: "users#moderator_edit", as: "edit_profile_moderate"
    patch ":id/moderate", to: "users#moderator_update", as: "update_profile_moderate"
  end

  resources :users, only: %i[show edit destroy update] do
    get "export", to: "users#export"
  end

  scope :editor do
    get "/", to: redirect("/")
    get "2010", to: "static#editor_2010", as: "editor_2010"
  end

  scope :banner do
    get "/", to: "static#banner", as: "banner"
    get "2014", to: "static#banner_2014", as: "banner_2014"
  end

  # API
  scope :api do
    get "skin/:id", to: "api#skin"
    get "tags", to: "api#tags"
  end
end
