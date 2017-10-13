class ConcentrationController < ApplicationController
			
	def index
		respond_with Concentration.all
	end

	def show
		
	end

	private
	def con_params
	end
end
