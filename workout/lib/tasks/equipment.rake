# 2 = free weights
# 3 = single station machines
# 4 = multi station machines
# 5 = cardio
# 6 = misc
namespace :equipment do
  desc "Equipment Seed"
  task seed_equipment: :environment do
  	Equipment.create!([{
  			name: "Squat Rack",
  			description: "Used to safely perform squats, and other various exercises. Used in conjunction with a Bar Bell and free weights.",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Bar Bell/Olympic Bar",
  			description: "A long straight bar used for bench press, squats, etc",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Bench Press",
  			description: "A flat, non-adjustable bench with two supports to hold onto a barbell.",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Pull Up Bar",
  			description: "A bar attached to a wall, or some in a door way, that you can do a variety of pull up exercises on.",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Body Weight",
  			description: "No equipment necessary. Just you, and yourself.",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Inclined Bench Press",
  			description: "A bench press with a adjustable section that will adjust your body to an incline to hit different muscle groups",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Hammer Strength Machine",
  			description: "A multiple exercise machine used primarily for chest, shoulders, and back.",
  			equipment_cat_id: 4
  		},
  		{
  			name: "Cable and Pulley Machine",
  			description: "Very diverse workout machine in the amount and types of exercises that can be performed by attaching grips to the end of the cables.",
  			equipment_cat_id: 4
  		},
  		{
  			name: "Dumbbells",
  			description: "Hand held weights. Can either be just a bar that accepts different weights, or a fixed weight. Great for a multitude of exercises.",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Lat Pulldown Machine",
  			description: "Used for strengthening your latissimus dorsi muscle, or lats as they are known.",
  			equipment_cat_id: 3
  		},
  		{
  			name: "Leg Extension Machine",
  			description: "A seat with an extension that sits over the calves. Used for training quadricep in the legs.",
  			equipment_cat_id: 3
  		},
  		{
  			name: "Leg Curl Machine",
  			description: "A machine in which you lay on your stomach, and curl your legs upward to work on the back of your legs",
  			equipment_cat_id: 3
  		},
  		{
  			name: "Hyper Extension Bench",
  			description: "A bench that supports your stomach, and allows you to lower and raise your upper body targeting your back.",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Dipping Bars",
  			description: "Parralel bars held up roughly at waist height. ",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Smith Machine",
  			description: "A squat or bench press machine that is perfect for when you don't have a spotter.",
  			equipment_cat_id: 4
  		},
  		{
  			name: "Preacher Bench",
  			description: "A seated curl bench that has a shelf to support your elbows. Used primarily to work on biceps.",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Abdominal Bench",
  			description: "An adjustable bench used for doing different vairations of sit ups.",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Leg Press Machine",
  			description: "A seated squat machine where you sit close to the floor, and push weight upwards with your legs.",
  			equipment_cat_id: 3
  		},
  		{
  			name: "Calf Machine",
  			description: "A machine used to train your calve muscles.",
  			equipment_cat_id: 3
  		},
  		{
  			name: "Leg Adduction/Abduction Machine",
  			description: "Used to train the inside and outside of your legs.",
  			equipment_cat_id: 3
  		},
  		{
  			name: "Peck Deck Machine",
  			description: "A machine made to do chest flys from a seated position.",
  			equipment_cat_id: 3
  		},
  		{
  			name: "Kettle Bells",
  			description: "Spherical weights with a handle attached to them. Usually a fixed weight.",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Medicine Ball/Wall Ball",
  			description: "A weighted ball.",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Foam Roller",
  			description: "A cylindercal roll of foam.",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Stability Ball",
  			description: "An inflated rubber ball.",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Curl Bar/EZ Bar",
  			description: "A zig zagged metal bar used in conjunction with free weights.",
  			equipment_cat_id: 2
  		},
  		{
  			name: "Straight Bar",
  			description: "A straight metal bar.",
  			equipment_cat_id: 2
  		}])
  end

end
