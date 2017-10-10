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
			console.log($scope.user);
		});

		// concentrations
		concentrations.query().then(function (results) {
	        $scope.concentrations = results;
	        $scope.searching = false;
	    }, function (error) {
	        // do something about the error
	        $scope.searching = false;
	    });

		$scope.selectedConcentration = [];

	    $scope.selectConc = function(x) {
	    	console.log("___________________________");
	    	if ($scope.selectedConcentration.length > 0) {
	    		for(var i = 0; i < $scope.selectedConcentration.length; i++) {
	    			var duplicate = false;
	 				var last = $scope.selectedConcentration.length - 1;
					var name = $scope.selectedConcentration[i].name;
					var entry = x.name;
					console.log(i + " - Current selected entry name " + entry);
					console.log(i + " - Current selected array name " + name);
					if(name === entry) {
						console.log("Duplicate entry");
						duplicate = true;
						break;
					} else if(!duplicate && i === last) {
						$scope.selectedConcentration.push(x);
						console.log($scope.selectedConcentration);
						break;
					};
				};
	    	} else {
	    		// console.log($scope.selectedConcentration);
		    	$scope.selectedConcentration.push(x);
	    		console.log($scope.selectedConcentration);	
	    	};
	    };

	    $scope.delete = function(id) {
			var toBeDeleted;
			function findDeleted(element) {
				toBeDeleted = element;
				return element.id === id;
			}
			var deleted = $scope.selectedConcentration.find(findDeleted);
			console.log(deleted);
			var index = $scope.selectedConcentration.indexOf(deleted);
			$scope.selectedConcentration.splice(index, 1);
			flash.deleted(deleted.name);
		}


		// User equipment
		userEquipment.query({user_id: $scope.user}).then(function(results){
			$scope.userEquipments = results;
			$scope.searching = false;
		});

		// exercises
		exercise.query().then(function(results) {
			$scope.exercises = results;
			$scope.searching = false;
		});

}]);