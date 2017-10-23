namespace :equipment_cat do
  desc "TODO"
  task seed_equipment_cat: :environment do
  	EquipmentCat.create!([{
  			name: "Free Weights",
  			description: "A free weight is any type of weight training equipment 
  			that does not limit the range of motion with which you can use it. 
  			This also includes any equipment used in conjunction with free weights."
  		},
  		{
  			name: "Single Station Machines",
  			description: "These are workout machines that are meant to only focus on one exercise. 
  			The range of motion will be restricted to only allow its specific exercise to be performed."
  		},
  		{
  			name: "Multi Station Machines",
  			description: "More common in home gym scenarios, these machines are meant to perform
  			multiple exercises. Similar to Single Station Machines, usually, the motion is restricted
  			to a particular motion."
  		},
  		{
  			name: "Cardio Equipment",
  			description: "This is equipment that is intended to be used for cardio. Treadmills, stationary bicycles, 
  			and stair masters all fall into this category. "
  		},
  		{
  			name: "Misc",
  			description: "Here you will find all the random stuff that doesn't fit neatly in a category."
  		}])
  end

end
