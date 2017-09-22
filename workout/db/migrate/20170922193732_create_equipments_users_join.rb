class CreateEquipmentsUsersJoin < ActiveRecord::Migration[5.0]
  def change
    create_table :equipment_users do |t|
      t.references :user, foreign_key: true
      t.references :equipment, foreign_key: true
    end
  end
end
