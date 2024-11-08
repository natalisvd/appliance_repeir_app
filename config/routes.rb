Rails.application.routes.draw do
  get 'home/index'
  devise_for :users

  # Define the root path route ("/")
  root 'home#index'
  resources :bookings, only: [:new, :create]
  get 'zip_to_city', to: 'bookings#zip_to_city'


  # Other routes…
end