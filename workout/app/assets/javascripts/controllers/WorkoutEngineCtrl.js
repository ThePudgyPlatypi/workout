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
		// the eventual filtered exercise array by concentration and equipment
		$scope.filteredExercises = [];
		$scope.workoutDuration = {};
		$scope.difficulty = {
			name: "Standard Difficulty",
			value: 3.5
		};
		$scope.navigator="start";

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

		var exerciseQuery = function(id) {
			// // run a query and store the corresponding exercises 
			exercise.query({concentration: id}).then(function(results) {
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
		};		

	    $scope.selectConc = function(x) {
	    	console.log("___________________________");
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
	    			console.log("Finished adding equipment");
	    		}
	    		for(var i = 0; i < $scope.userEquipments.length; i++) {
	    			var selected = $scope.userEquipments[i].equipmentId;
	    			$scope.equipmentIdList.push(parseInt(selected));
	    			console.log($scope.equipmentIdList);
	    		} 
	    		$scope.navigator = "active";
	    	} else {
	    		flash.error("please make a selection","");
	    		// console.log("please make a selection");
	    	}
			// $scope.filteredExercises = exerciseFilter($scope.exercises, $scope.userEquipments);
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
}]);