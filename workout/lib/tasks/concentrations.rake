namespace :concentrations do
  desc "generate concentrations"
  task seed_concentrations: :environment do
  	Concentration.create!([{
  			name: "Arms"
  		},
  		{
  			name: "Legs"
		},
		{
			name: "Back"
		},
		{
			name: "Core"
		},
		{
			name: "Shoulders"
		},
		{
			name: "All"
		},
		{
			name: "Chest"
		},
		{
			name: "Random"
		}])
  end

  # p "Created #{Concentration.count} concentrations"
end
