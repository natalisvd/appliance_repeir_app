# app/controllers/bookings_controller.rb
class BookingsController < ApplicationController
  before_action :set_resources, only: [:new, :create]

  def create
    # Find or create a client based on email
    client = Client.find_or_initialize_by(email: booking_params[:client][:email])
    client.update(booking_params[:client])

    # Associate the booking with the client
    @booking = client.bookings.build(booking_params.except(:client))

    if @booking.save
      redirect_to root_path, notice: "Booking created successfully!"
    else
      render :new, alert: "Please complete all required fields."
    end
  end

  private

  def set_resources
    @appliances = Appliance.all
    @manufacturers = Manufacturer.all
  end

  def booking_params
    params.require(:booking).permit(
      :appliance_id, :manufacturer_id, :model, :age, :repair_date, :half_of_day,
      client: [:full_name, :phone, :email, :postcode, :building_number, :street, :city]
    )
  end
end
