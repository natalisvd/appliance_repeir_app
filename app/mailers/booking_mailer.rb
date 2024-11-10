# app/mailers/booking_mailer.rb
class BookingMailer < ApplicationMailer
  default to: 'admin@example.com' # replace with your admin's email

  def new_booking_notification(booking)
    @booking = booking
    mail(
      to: 'gamultiservice11@gmail.com', # Replace with the administrator's email
      subject: "New Booking Received",
      from: 'natalyasvd@gmail.com',
    )
  end
end
