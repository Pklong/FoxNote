Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :notes, except: [:edit]
    resources :notebooks, except: [:edit]
    resources :searches, only: [:index]
    resources :users, only: [:create, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]

  end
  # for google oauth2
  get "/auth/google/callback", to: "omniauth#google"
  # for browserHistory
  get '*unmatched_route', to: 'static_pages#root'
  # , constraints: { url: /^((?!\/auth\/).)*$/ }
end
