class EquipmentCatsController < ApplicationController
  before_action :set_equipment_cat, only: [:show, :edit, :update, :destroy]

  # GET /equipment_cats
  # GET /equipment_cats.json
  def index
    @equipment_cats = EquipmentCat.all
  end

  # GET /equipment_cats/1
  # GET /equipment_cats/1.json
  def show
  end

  # GET /equipment_cats/new
  def new
    @equipment_cat = EquipmentCat.new
  end

  # GET /equipment_cats/1/edit
  def edit
  end

  # POST /equipment_cats
  # POST /equipment_cats.json
  def create
    @equipment_cat = EquipmentCat.new(equipment_cat_params)

    respond_to do |format|
      if @equipment_cat.save
        format.html { redirect_to @equipment_cat, notice: 'Equipment cat was successfully created.' }
        format.json { render :show, status: :created, location: @equipment_cat }
      else
        format.html { render :new }
        format.json { render json: @equipment_cat.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /equipment_cats/1
  # PATCH/PUT /equipment_cats/1.json
  def update
    respond_to do |format|
      if @equipment_cat.update(equipment_cat_params)
        format.html { redirect_to @equipment_cat, notice: 'Equipment cat was successfully updated.' }
        format.json { render :show, status: :ok, location: @equipment_cat }
      else
        format.html { render :edit }
        format.json { render json: @equipment_cat.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /equipment_cats/1
  # DELETE /equipment_cats/1.json
  def destroy
    @equipment_cat.destroy
    respond_to do |format|
      format.html { redirect_to equipment_cats_url, notice: 'Equipment cat was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_equipment_cat
      @equipment_cat = EquipmentCat.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def equipment_cat_params
      params.require(:equipment_cat).permit(:name, :description)
    end
end
