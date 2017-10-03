class EquipmentController < ApplicationController
	def index
		@equipment = Equipment.all
		render json: @equipment
	end
end
