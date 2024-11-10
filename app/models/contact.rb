class Contact < ApplicationRecord
  validates :name, :phone, :email, :message, presence: true
end
