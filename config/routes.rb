Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "static#editor"
  get "banner", to: "static#banner", as: "banner"
  get "about", to: "static#about", as: "about"
  get 'sitemap', to: 'static#sitemap', defaults: {format: 'xml'}
  get "gallery", to: "skins#index"
  get "skins/:id/download", to: "skins#download", as: "skin_download"
  resources :skins, only: %i[create show edit destroy]
  resources :users, only: %i[show]

  # API
  scope :api do
    get 'skin/:id', to: "api#skin"
  end
end
