class ChangePhoneTypeInClients < ActiveRecord::Migration[6.0]
  def change
    change_column :clients, :phone, :string
  end
end