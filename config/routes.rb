Rails.application.routes.draw do
  get 'reviews/new'
  get 'reviews/create'
  get 'home/index'
  devise_for :users

  # Define the root path route ("/")
  root 'home#index'
  resources :bookings, only: [:new, :create]
  get 'zip_to_city', to: 'bookings#zip_to_city'
  get 'contact', to: 'pages#contact'  # Display the form
  post 'contact', to: 'contacts#create'  # Handle the form submission
  resources :reviews, only: [:new, :create]

  # Other routes…
end