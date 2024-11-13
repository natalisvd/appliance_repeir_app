class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Enum to define roles
  enum role: { client: 'client', technician: 'technician', admin: 'admin' }

  # Add validations if desired, e.g., validate presence of role
  validates :role, presence: true
  before_validation :set_default_role, on: :create

  def set_default_role
    self.role ||= :admin
  end
end