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

		// array for the concentrations the user will select
		$scope.selectedConcentration = [];
		// concentration filtered exerciese, but not equipment filtered
		$scope.exercises = [];
		$scope.exercises2 = [];
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

		// This is hitting the route to grab exercises that match the concentrations selected
		var exerciseQuery = function(concId, eqId) {
			// // run a query and store the corresponding exercises 
			if(concId) {
				exercise.query({concentration:concId}).then(function(results) {
					// for loop to add each individual result 
					for( var each = 0; each < results.length; each++) {
						var duplicate = duplicateCheck($scope.exercises, results[each], "name");
						if (!duplicate) {
							$scope.exercises.push(results[each]);
						} else {
							continue;
						};
					};
					$scope.searching = false;
				}, function(error) {
					console.log(error);
				});
			} else if (eqId) {
				exercise.query({equipment:eqId}).then(function(results) {
					for(var each = 0; each < results.length; each++) {
						var duplicate = duplicateCheck($scope.exercises, results[each], "name");
						if (!duplicate) {
							$scope.exercises2.push(results[each]);
						} else {
							continue;
						};
					};
					$scope.searching = false;
				}, function(error) {
					console.log(error);
				});
			}
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
	    		$scope.equipmentIdList = [];
	    		for (var each = 0; each < $scope.selectedConcentration.length; each++) {
	    			exerciseQuery($scope.selectedConcentration[each].id);
	    			// console.log("Finished adding equipment");
	    		}
	    		for(var i = 0; i < $scope.userEquipments.length; i++) {
	    			var selected = $scope.userEquipments[i].equipmentId;
	    			exerciseQuery(null, selected);
	    			$scope.equipmentIdList.push(parseInt(selected));
	    			console.log($scope.exercise2);
	    			// console.log($scope.equipmentIdList);
	    		} 
	    		$scope.navigator = "active";
	    	} else {
	    		flash.error("please make a selection");
	    		// console.log("please make a selection");
	    	}
			// console.log("Finished Filtering");
			// console.log($scope.filteredExercises);
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
			console.log($scope.exercises.length);
		}
}]);