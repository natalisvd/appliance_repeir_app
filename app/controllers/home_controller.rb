class HomeController < ApplicationController
  def index
    @appliances = Appliance.all
    @manufacturers = Manufacturer.all

  end
end
