class Booking < ApplicationRecord
  belongs_to :client
  belongs_to :appliance
  belongs_to :manufacturer

end
