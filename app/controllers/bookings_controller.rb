class BookingsController < ApplicationController
  def zip_to_city
    mapping = ZipCodeMapping.find_by(zip_code: params[:zip_code])
    render json: { city: mapping&.city || "" }
  end
  def create
    puts 'success'
    @client = Client.find_or_initialize_by(email: params[:client][:email])
    @client.assign_attributes(client_params)
    @booking = Booking.new(booking_params.merge(client: @client))

    if @client.save && @booking.save
      render json: { success: true, message: 'Booking created successfully!' }, status: :created
    else
      render json: { success: false, errors: @client.errors.full_messages + @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def booking_params
    params.require(:booking).permit(:appliance_id, :manufacturer_id, :problem_description, :repair_date, :part_of_the_day)
  end

  def client_params
    params.require(:client).permit(:full_name, :zip_code, :city, :address, :phone, :email)
  end
end
