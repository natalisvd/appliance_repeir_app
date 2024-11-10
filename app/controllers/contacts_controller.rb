# app/controllers/contacts_controller.rb
class ContactsController < ApplicationController
  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      ContactMailer.contact_message(@contact).deliver_now
      flash[:notice] = 'Your message has been sent successfully!'
      redirect_to root_path
    else
      flash[:alert] = 'There was an error sending your message.'
      render :new
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :phone, :message, :email)
  end
end
