class Review < ApplicationRecord
  belongs_to :client
  validates :client, :presence => true
end
