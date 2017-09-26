class EquipmentController < ApplicationController
  def index
  	respond_with Equipment.all
  end

  def show
  end
end
