Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :notes, except: [:edit, :new]
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:create, :update, :destroy]
  end
end
