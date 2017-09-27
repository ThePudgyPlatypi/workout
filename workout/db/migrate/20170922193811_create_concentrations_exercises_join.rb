class CreateConcentrationsExercisesJoin < ActiveRecord::Migration[5.0]
  def change
    create_table :concentrations_exercises do |t|
      t.references :concentration, foreign_key: true
      t.references :exercise, foreign_key: true
    end
  end
end
