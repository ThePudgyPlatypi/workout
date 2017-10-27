class EquipmentController < ApplicationController
	def index
		@equipment = Equipment.all
		render json: @equipment
	end

	def show
		@equipment = Equipment.find(params[:id])
		render json: @equipment.exercises
	end
end
