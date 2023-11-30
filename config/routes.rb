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

    namespace :admin do
      root to: 'admin_home#index' # Ruta raíz para el namespace admin
      get 'usuarios', to: 'admin_home#usuarios', as: 'usuarios'
      get 'cursos', to: 'admin_home#cursos', as: 'cursos'
      post 'cursos', to: 'admin_home#create_curso', as: 'admin_cursos'
    end

  authenticated :user do
    resources :alumno_home, only: [:index], controller: 'alumno_home'
    resources :profesor_home, only: [:index], controller: 'profesor_home'
    resources :admin_home, only: [:index], controller: 'admin_home'
  end
  
  resources :semestres do
    resources :asignaturas do
      resources :documentos
    end
  end
  
  root 'home#index'
end
