class CreateClients < ActiveRecord::Migration[7.1]
  def change
    create_table :clients do |t|
      t.string :full_name
      t.integer :phone
      t.string :email
      t.integer :zip_code
      t.string :address
      t.string :city

      t.timestamps
    end
  end
end
