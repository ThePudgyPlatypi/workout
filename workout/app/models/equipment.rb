class Equipment < ApplicationRecord
	has_and_belongs_to_many :users
	has_and_belongs_to_many :exercises
	belongs_to :equipment_cat
end
