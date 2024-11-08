class CreateZipCodeMappings < ActiveRecord::Migration[7.1]
  def change
    create_table :zip_code_mappings do |t|
      t.integer :zip_code
      t.string :city

      t.timestamps
    end
  end
end
