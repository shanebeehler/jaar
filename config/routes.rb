Rails.application.routes.draw do
  root 'users#show'
  resource :users
  resources :user_sessions
  resources :password_resets

  get 'login' => 'user_sessions#new', :as => :login
  post 'logout' => 'user_sessions#destroy', :as => :logout
end
