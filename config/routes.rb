Rails.application.routes.draw do
  get 'home/index'
  
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }
  devise_scope :user do
    get '/users/sign_out' => 'users/sessions#destroy'
  end

  #ruta alumno
  get 'alumno_home/index', to: 'alumno_home#index', as: 'alumno_home'
  #ruta profesor
  get 'profesor_home/index', to: 'profesor_home#index', as: 'profesor_home'
  #ruta admin
  get 'admin_home/index', to: 'admin_home#index', as: 'admin_home'

  

  authenticated :user do
    resources :alumno_home, only: [:index], controller: 'alumno_home'
    resources :profesor_home, only: [:index], controller: 'profesor_home'
    resources :admin_home, only: [:index], controller: 'admin_home'
  end

  root 'home#index'
end
