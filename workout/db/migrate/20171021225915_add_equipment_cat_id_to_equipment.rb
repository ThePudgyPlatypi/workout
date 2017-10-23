class AddEquipmentCatIdToEquipment < ActiveRecord::Migration[5.0]
  def change
    add_reference :equipment, :equipment_cat, foreign_key: true
  end
end
