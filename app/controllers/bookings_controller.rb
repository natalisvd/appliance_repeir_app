class BookingsController < ApplicationController
  def zip_to_city
    mapping = ZipCodeMapping.find_by(zip_code: params[:zip_code])
    render json: { city: mapping&.city || "" }
  end
  def create
    puts 'success'
    @client = Client.find_or_initialize_by(email: params[:client][:email], phone: params[:client][:phone], full_name: params[:client][:full_name], city: params[:client][:city], zip_code: params[:client][:zip_code])
    @client.assign_attributes(client_params)
    @booking = Booking.new(booking_params.merge(client: @client))
    if @client.save && @booking.save
      BookingMailer.new_booking_notification(@booking).deliver_later
      render json: { success: true, message: 'Booking created successfully!' }, status: :created
      SendReviewRequestJob.set(wait: 2.hours).perform_later(@client)
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
