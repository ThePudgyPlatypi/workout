class UserEquipmentController < ApplicationController

	def index
		@user_equipment = UserEquipment.all
		@user = User.find(current_user.id)
		respond_with @user.user_equipments
		flash[:notice] = "Equipment Saved Successfully"
	end

	def show
		
	end

	def new
	end

	def create
		respond_with UserEquipment.create(ue_params.merge(user_id: current_user.id))
	end

	def edit
	end

	def update
	end

	def delete
	end

	def destroy
		@user = User.find(current_user.id)
	    @userEquipment = @user.user_equipments.find(params[:id])
	    @userEquipment.destroy
	    flash[:notice] = "Equipment Removed Successfully"
	end

	private
	def ue_params 
		params.require(:user_equipment).permit(:name, :description, :user_id)
	end
end
