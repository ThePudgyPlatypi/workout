class EquipmentController < ApplicationController
	def index
		@equipment = Equipment.all
		render json: @equipment
	end

	def show

	end
end
