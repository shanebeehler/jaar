Rails.application.routes.draw do


  resources :jars do
    resources :items
  end

  resource :users
  root 'jars#index'
  resources :user_sessions, only: [:new, :create, :destroy]
  resources :password_resets, only: [:create, :edit, :update]

  get 'pages/landing'
  get 'login' => 'user_sessions#new', :as => :login
  post 'logout' => 'user_sessions#destroy', :as => :logout
  post 'close_jar/:id' => 'jars#close_jar'

end
