class SendReviewRequestJob < ApplicationJob
  queue_as :default

  def perform(client)
    ReviewMailer.review_request(client).deliver_now
  end
end
