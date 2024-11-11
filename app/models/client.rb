class Client < ApplicationRecord
  has_many :bookings
  validates :full_name, presence: true
  validates :phone, format: { with: /\A\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\z/, message: "must be a valid U.S. phone number" }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: "is not a valid email" }
  has_many :reviews
end
