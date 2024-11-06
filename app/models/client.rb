class Client < ApplicationRecord
  has_many :bookings
  belongs_to :appliance
  belongs_to :manufacturer
  validates :full_name, presence: true
  validates :postcode, inclusion: { in: %w(30040 30022 30328 30060 30066 30114 30096 30519 30518 30062 30305 30319 30005 30041),
                                    message: "is not within our service area" }
  validates :phone, format: { with: /\A\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\z/, message: "must be a valid U.S. phone number" }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: "is not a valid email" }
end
