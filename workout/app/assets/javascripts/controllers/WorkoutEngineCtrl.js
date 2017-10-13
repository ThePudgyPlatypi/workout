app.controller("WorkoutEngineCtrl", [
	"$scope",  
	"equipment", 
	"userEquipment", 
	"concentrations",
	"exercise",
	"Auth",
	"flash",
	function($scope, equipment, userEquipment, concentrations, exercise, Auth, flash) {
		$scope.searching = true;
		
		// getting current user
		Auth.currentUser().then(function(user) {
			$scope.user = user.id;
		});

		// concentrations
		concentrations.query().then(function (results) {
	        $scope.concentrations = results;
	        $scope.searching = false;
	    }, function (error) {
	        console.log(error);
	        $scope.searching = false;
	    });

		// array for the concentrations the user will select
		$scope.selectedConcentration = [];
		// the eventual filtered exercise array
		$scope.filteredExercises = [];
		// concentration ids used later for querying exercises by concentration
		$scope.cId = [];
		// user equipment equipment id used to filter the exercises later
    	$scope.eId = [];		

	    $scope.selectConc = function(x) {
	    	// console.log("___________________________");
	    	if ($scope.selectedConcentration.length > 0) {
	    		for(var i = 0; i < $scope.selectedConcentration.length; i++) {
	    			var duplicate = false;
	 				var last = $scope.selectedConcentration.length - 1;
					var name = $scope.selectedConcentration[i].name;
					var entry = x.name;
					// console.log(i + " - Current selected entry name " + entry);
					// console.log(i + " - Current selected array name " + name);
					if(name === entry) {
						// console.log("Duplicate entry");
						duplicate = true;
						break;
					} else if(!duplicate && i === last) {
						$scope.selectedConcentration.push(x);
						// console.log($scope.selectedConcentration);
						break;
					};
				};
	    	} else {
	    		// console.log($scope.selectedConcentration);
		    	$scope.selectedConcentration.push(x);
	    		// console.log($scope.selectedConcentration);	
	    	};
	    };

	    $scope.finish = function() {
	    	if ($scope.selectedConcentration.length > 0) {
		    	// exercises
		    	function sortNumbers(a, b){
		    		return a - b;
		    	}
		    	
		    	for(var c = 0; c < $scope.selectedConcentration.length; c++) {
		    		var id = $scope.selectedConcentration[c].id;
		    		$scope.cId.push(id);
		    		$scope.cId.sort(sortNumbers);
		    	}

		    	console.log($scope.cId);

		    	for(var eq = 0; eq < $scope.userEquipments.length; eq++) {
		    		var id = $scope.userEquipments[eq].id;
		    		$scope.eId.push(id);
		    		$scope.eId.sort(sortNumbers);
		    	}

		    	console.log($scope.eId);

		    	for(var q = 0; q < $scope.cId.length; q++) {
		    		var id = $scope.cId[q];
		    		exercise.query({concentration: id}).then(function(results) {
		    			// for loop to add each individual result 
		    			for( var each = 0; each < results.length; each++) {
		    				$scope.filteredExercises.push(results[each]);
		    			}
						$scope.searching = false;
					}, function(error) {
						console.log(error);
					});
		    	}
		    } else {
		    	flash.saved("nope");
		    }
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


		// User equipment
		userEquipment.query({user_id: $scope.user}).then(function(results){
			$scope.userEquipments = results;
			$scope.searching = false;
		});

		

}]);