class ExerciseController < ApplicationController
	def index
		respond_with Exercise.all
	end

	def show
	end
end
