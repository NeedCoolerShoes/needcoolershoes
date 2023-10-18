Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: "sessions" }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "static#editor"
  get "banner", to: "static#banner", as: "banner"
  get "about", to: "static#about", as: "about"
  get "contact", to: "static#contact", as: "contact"
  post "contact", to: "static#send_message", as: "send_message"
  get "open_letter", to: "static#open_letter"
  get "rules", to: "static#rules"
  get 'sitemap', to: 'static#sitemap', defaults: {format: 'xml'}
  get "gallery", to: "skins#index"
  get "gallery/:page", to: "skins#index"
  get "skins/:id/download", to: "skins#download", as: "skin_download"
  post "skins/:id/favourite", to: "skins#add_favourite", as: "create_skin_favourite"
  delete "skins/:id/favourite", to: "skins#remove_favourite", as: "destroy_skin_favourite"
  resources :skins, only: %i[create show edit destroy update]
  get "users/current", to: "users#current", as: "current_user"
  patch "profile", to: "users#update", as: "update_profile"

  scope :users do
    resource :otp, controller: "otp", only: %i[update destroy] do
      get "backup_codes"
      get "verify"
    end
  end

  resources :users, only: %i[show edit destroy update] do
    get "export", to: "users#export"
  end

  # API
  scope :api do
    get 'skin/:id', to: "api#skin"
    get 'skins', to: "api#skins"
    get 'tags', to: "api#tags"
  end
end
