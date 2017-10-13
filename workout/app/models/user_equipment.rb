class UserEquipment < ApplicationRecord
	belongs_to :user
	belongs_to :equipment

	def as_json(options = {})
		super(options.merge(include: :user))
	end
end
