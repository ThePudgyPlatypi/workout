class CreateUserEquipments < ActiveRecord::Migration[5.0]
  def change
    create_table :user_equipments do |t|
      t.string :name
      t.string :description
      t.string :user_id
      t.string :equipment_id

      t.timestamps
    end
    add_index :user_equipments, [:user_id, :equipment_id]
  end
end
