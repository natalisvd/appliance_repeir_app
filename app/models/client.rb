class Client < ApplicationRecord
  has_many :bookings
  belongs_to :appliance
  belongs_to :manufacturer
end
