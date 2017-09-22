class AddEquipmentIdToExercise < ActiveRecord::Migration[5.0]
  def change
    add_reference :exercises, :equipment, foreign_key: true
  end
end
