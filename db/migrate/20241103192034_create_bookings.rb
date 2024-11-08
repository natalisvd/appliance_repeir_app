class CreateBookings < ActiveRecord::Migration[7.1]
  def change
    create_table :bookings do |t|
      t.integer :appliance_id
      t.integer :manufacturer_id
      t.text :problem_description
      t.integer :client_id
      t.string :part_of_the_day
      t.date :repair_date

      t.timestamps
    end
  end
end
