class CreateClients < ActiveRecord::Migration[7.1]
  def change
    create_table :clients do |t|
      t.string :full_name
      t.string :phone
      t.string :email
      t.string :postcode
      t.string :building_number
      t.string :street
      t.string :city

      t.timestamps
    end
  end
end
