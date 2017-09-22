class Exercise < ApplicationRecord
	belongs_to :equipment
	has_and_belongs_to_many :concentrations
end
