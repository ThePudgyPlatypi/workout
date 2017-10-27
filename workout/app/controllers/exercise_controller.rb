class ExerciseController < ApplicationController
	
	def index
		@concentration = Concentration.find(params[:concentration])
		@equipment = Equipment.find(params[:equipment])
		if @concentration
			respond_with @concentration.exercises
		elsif @equipment
			respond_with @equipment.exercises
		end
	end

	def show
	end
end
