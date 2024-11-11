class HomeController < ApplicationController
  def index
    @appliances = Appliance.all
    @manufacturers = Manufacturer.all
    @reviews = Review.includes(:client).order(created_at: :desc).limit(5) # Show recent 5 reviews

  end
end
