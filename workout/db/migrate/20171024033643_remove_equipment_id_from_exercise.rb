class RemoveEquipmentIdFromExercise < ActiveRecord::Migration[5.0]
  def change
    remove_reference :exercises, :equipment, foreign_key: true
  end
end
