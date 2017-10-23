require "rails_helper"

RSpec.describe EquipmentCatsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/equipment_cats").to route_to("equipment_cats#index")
    end

    it "routes to #new" do
      expect(:get => "/equipment_cats/new").to route_to("equipment_cats#new")
    end

    it "routes to #show" do
      expect(:get => "/equipment_cats/1").to route_to("equipment_cats#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/equipment_cats/1/edit").to route_to("equipment_cats#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/equipment_cats").to route_to("equipment_cats#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/equipment_cats/1").to route_to("equipment_cats#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/equipment_cats/1").to route_to("equipment_cats#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/equipment_cats/1").to route_to("equipment_cats#destroy", :id => "1")
    end

  end
end
