class CreateAppliances < ActiveRecord::Migration[7.1]
  def change
    create_table :appliances do |t|
      t.string :name

      t.timestamps
    end
  end
end
