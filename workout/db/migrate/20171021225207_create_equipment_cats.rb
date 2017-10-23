class CreateEquipmentCats < ActiveRecord::Migration[5.0]
  def change
    create_table :equipment_cats do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
