Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "static#editor"
  get "banner", to: "static#banner"
  get "gallery", to: "skins#index"
  resources :skins, only: %i[create show edit destroy]
end
