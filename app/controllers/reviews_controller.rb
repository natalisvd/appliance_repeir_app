# app/controllers/reviews_controller.rb
class ReviewsController < ApplicationController
  def new
    @client = Client.find_by(id: params[:client_id])
    if @client.nil? || @client.reviews.exists?
      redirect_to root_path, alert: "You cannot submit a review for this client."
    else
      @review = Review.new
    end
  end

  def create
    @review = Review.new(review_params)
    @client = Client.find(review_params[:client_id])

    if @review.save
      redirect_to root_path, notice: "Thank you for your feedback!"
    else
      flash.now[:alert] = "There was an issue submitting your feedback."
      render :new
    end
  end

  private

  def review_params
    params.require(:review).permit(:client_id, :rating, :comment)
  end
end
