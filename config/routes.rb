Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :notes, except: [:edit]
    resources :notebooks, except: [:edit]
    resources :searches, only: [:index]
    resources :users, only: [:create, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]

  end
  # for browserHistory
  get '*unmatched_route', to: 'static_pages#root'
end
