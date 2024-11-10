class CreateContacts < ActiveRecord::Migration[7.1]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :phone
      t.text :message
      t.string :email

      t.timestamps
    end
  end
end
