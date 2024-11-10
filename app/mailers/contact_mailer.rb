# app/mailers/contact_mailer.rb
class ContactMailer < ApplicationMailer
  def contact_message(contact)
    @contact = contact
    email = @contact.email  || "natalyasvd@gmail.com"
    mail(to: 'gamultiservice11@gmail.com', subject: "New Contact Us Message", from: email)
  end
end
