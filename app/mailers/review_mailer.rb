class ReviewMailer < ApplicationMailer
  def review_request(client)
    @client = client
    @review_link = "https://2b76-81-111-236-189.ngrok-free.app/reviews/new?client_id=#{@client.id}"

    mail(to: @client.email, subject: "Please Share Your Feedback")
  end
end
