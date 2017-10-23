require 'rails_helper'

RSpec.describe "EquipmentCats", type: :request do
  describe "GET /equipment_cats" do
    it "works! (now write some real specs)" do
      get equipment_cats_path
      expect(response).to have_http_status(200)
    end
  end
end
