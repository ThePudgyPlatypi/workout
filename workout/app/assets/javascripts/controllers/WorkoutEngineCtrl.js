app.controller("WorkoutEngineCtrl", [
	"$scope",  
	"equipment", 
	"userEquipment", 
	"concentrations",
	"exercise",
	"Auth",
	"flash",
	"exerciseFilter",
	function($scope, equipment, userEquipment, concentrations, exercise, Auth, flash, exerciseFilter) {
		$scope.searching = true;
		$scope.pageClass="Workout";
		// array for the concentrations the user will select
		$scope.selectedConcentration = [];
		// concentration filtered exerciese, but not equipment filtered
		$scope.exercises = [];
		// the eventual filtered exercise array by concentration and equipment
		$scope.filteredExercises = [];
		$scope.workoutDuration = {
			time: ""
		};
		$scope.difficulty = {
			value: "Standard Difficulty"
		};
		$scope.navigator = "start";
		$scope.exerciseNavigator = 0;	
		$scope.equipmentList = [];


		// getting current user
		Auth.currentUser().then(function(user) {
			$scope.user = user.id;
		});

		// concentrations db query
		concentrations.query().then(function (results) {
	        $scope.concentrations = results;
	        $scope.searching = false;
	    }, function (error) {
	        console.log(error);
	        $scope.searching = false;
	    });

	    // User equipment db query
		userEquipment.query({user_id: $scope.user}).then(function(results){
			$scope.userEquipments = results;
			$scope.searching = false;
		});
		
		// Watches for a change on UserEquipment scope, then snags the stuffs when it is populated (not undefined)
		$scope.$watch('userEquipments', function() {
			if ($scope.userEquipments) {
				for(var each = 0; each < $scope.userEquipments.length; each++) {
					var currentEquip = $scope.userEquipments[each].equipmentId;
					equipment.get(currentEquip).then(function(results) {
						// Getting rid of any exercise arrays that may be empty thanks to not having exercises for that equipment
						if(results.length > 0) {
							// Checking for duplicates to make sure that only single entries are added
							for(var r = 0; r < results.length; r++) {
								var dup = duplicateCheck($scope.exercises, results[r], "name");
								if (!dup) {
									$scope.exercises.push(results[r]);
								} else {
									continue;
								};
							}
						}
					});		
				};
			};
		});
			
		

		// duplicate check, takes in array, item you that you want to add to array if there are no dup's, and
		// the property that you are checking against. Property should be present on each array object.
		var duplicateCheck = function(arr, item, property, comments) {
			var duplicate;

			if(!comments) {
				comments = false;
			}

			if (comments) {
				console.log("Array to be checked for duplicates = ");
				console.log(arr);
				console.log("Item to be checked if a duplicate = ");
				console.log(item);
				console.log("Value being used to find duplicates = " + property);
			}		

			for(var i = 0; i < arr.length; i++) {
    			duplicate = false;
    			var last = arr.length - 1;
				var name = arr[i][property];
				var entry = item[property];

				if (comments) {
					console.log("Checking array entry: (" + i + ") with value of: (" + name + ") against would-be array entry: (" + entry + ")");
				}

				if(name === entry) {
					if (comments) {
						console.log("Duplicate entry found on " + i);
					}
					duplicate = true;
					break;
				} else if(!duplicate && i === last) {
					if (comments) {
						console.log("Last index reached, no duplicates found");
					}
					break;
				};
			};
			return duplicate;	
		};


		// This is just putting each selected concentration into an array
	    $scope.selectConc = function(x) {
	    	// console.log("___________________________");
	    	if ($scope.selectedConcentration.length > 0) {
	    		var duplicate = duplicateCheck($scope.selectedConcentration, x, "name");
	    		if (!duplicate) {
	    			$scope.selectedConcentration.push(x);
	    		};
	    	} else {
		    	$scope.selectedConcentration.push(x);	
	    	};
	    };

	    $scope.finish = function() {
	    	if ($scope.selectedConcentration.length > 0) {
	    		// then go out and grab all the exercises that match the concentration that is selected
	    		for (var each = 0; each < $scope.selectedConcentration.length; each++) {
	    			var concId = $scope.selectedConcentration[each].id;
	    			// query the database
	    			exercise.query({concentration:concId}).then(function(results) {
						// for loop to add each individual result 
						for(var i = 0; i < results.length; i++) {
							// then check to see if they are a duplicate of the exercise list returned from the userEquipment query
							// if they are, then add them to a list call filteredExercises because if they have the same concentration 
							// and they are from the list of equipment that is available then the user wants to do a workout like that
							var duplicate = duplicateCheck($scope.exercises, results[i], "name");
							if (duplicate) {
								// console.log("duplicate found, adding " + results[i].name);
								// console.log($scope.filteredExercises);
								$scope.filteredExercises.push(results[i]);
								// console.log($scope.filteredExercises);
							} else {
								continue;
							};
						};
						$scope.searching = false;
					}, function(error) {
						console.log(error);
					});
					
	    		};
	    		// console.log($scope.exercises);
	    		$scope.navigator = "active";
	    	} else {
	    		flash.error("You need to select a concentration!");
	    	};
	    }
	    
	    $scope.delete = function(id) {
			var toBeDeleted;
			function findDeleted(element) {
				toBeDeleted = element;
				return element.id === id;
			}
			var deleted = $scope.selectedConcentration.find(findDeleted);
			// console.log(deleted);
			var index = $scope.selectedConcentration.indexOf(deleted);
			$scope.selectedConcentration.splice(index, 1);
			flash.deleted(deleted.name);
		}

		$scope.navigatorSwitch = function(page) {
			$scope.navigator = page;
		}

		$scope.exerciseSwitch = function(id) {
			$scope.exerciseNavigator = id + 1;
			console.log($scope.filteredExercises.length);
		}
}]);