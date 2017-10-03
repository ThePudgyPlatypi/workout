app.controller("UserEquipmentCtrl", [
	"$scope", 
	"equipment",
	"userEquipment", 
	"Auth",
	function($scope, equipment, userEquipment, Auth) {
		$scope.searching = true;
		var user;
		// getting current user
		Auth.currentUser().then(function(user) {
			user = user.id;
		});

		// equipment
		equipment.query().then(function(results) {
			$scope.equipments = results;
			$scope.searching = false;
		}, function(error) {
			$scope.searching = false;
		});

		// User equipment

		userEquipment.query().then(function(results){
			$scope.userEquipments = [];
			$scope.userEquipments = results; 
		});

		$scope.userEquipments = [];
		$scope.selected = [];

		$scope.addEquipmentToUser = function() {
			outerloop:
			for(var i = 0; i < $scope.selected.length; i++) {
				var duplicate = false;
				var name = $scope.selected[i].name;
				var description = $scope.selected[i].description;
				console.log(i + " - Current selected entry name " + name);

				// checking for duplicate entries
				for (var x = 0; x < $scope.userEquipments.length; x++) {
					console.log("Innerloop " + x + " - Checking for duplicate on " + $scope.userEquipments[x].name + " against " + name)
					if ($scope.userEquipments[x].name === name) {
						console.log("Duplicate entry = " + $scope.userEquipments[x].name)
						duplicate = true;
						break;
					}
				};

				// checking if the value is null since when using check boxes it leaves a null and throws an error
				// also checking to see if the innerloop has found a duplicate entry and skipping if so
				if (!$scope.selected[i]) {
					console.log("Entry is a false value. Skipping to next entry")
					continue;
				} else if (duplicate) {
					console.log("Skipping to next entry because of duplicate")
					continue;
				} else {
					// assigning new database entry, user_id gets added via rails controller
					new userEquipment({
						name: name,
						description: description
					}).create();
					$scope.userEquipments.push($scope.selected[i]);
					$scope.selected = [];
				}
			};
		};
}]);