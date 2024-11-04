class CreateBookings < ActiveRecord::Migration[7.1]
  def change
    create_table :bookings do |t|
      t.integer :appliance_id
      t.integer :manufacturer_id
      t.string :model
      t.string :age
      t.integer :client_id
      t.string :half_of_day
      t.date :repair_date

      t.timestamps
    end
  end
end
