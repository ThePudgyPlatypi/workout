app.controller("UserEquipmentCtrl", [
	"$scope", 
	"equipment",
	"userEquipment", 
	"Auth",
	"flash",
	"$state",
	function($scope, equipment, userEquipment, Auth, flash, $state) {
		$scope.searching = true;
		$scope.pageClass="UserEquipment";
		
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
			console.log(error);
			$scope.searching = false;
		});

		// User equipment
		// Load Query

		userEquipment.query().then(function(results){
			$scope.userEquipments = [];
			$scope.userEquipments = results;
			$scope.searching = false; 
		});

		$scope.userEquipments = [];
		$scope.selected = [];

		$scope.addEquipmentToUser = function() {
			console.log("_________________________________")
			outerloop:
			for(var i = 0; i < $scope.selected.length; i++) {
				var duplicate = false;
				var name = $scope.selected[i].name;
				var description = $scope.selected[i].description;
				var equipment_id = $scope.selected[i].id;
				console.log(i + " - Current selected entry name " + name);

				// First checking if the value is false before continuing 
				if (!$scope.selected[i]) {
					console.log("Entry is a false value. Skipping to next entry");
					console.log("_________________________________");
					continue;
				} 

				// checking for duplicate entries
				for (var x = 0; x < $scope.userEquipments.length; x++) {
					// console.log("Innerloop " + x + " - Checking for duplicate on " + $scope.userEquipments[x].name + " against " + name)
					if ($scope.userEquipments[x].name === name) {
						console.log("Duplicate entry = " + $scope.userEquipments[x].name)
						duplicate = true;
						break;
					}
				};

	
				// also checking to see if the innerloop has found a duplicate entry and skipping if so
				if (duplicate) {
					console.log("Skipping to next entry because of duplicate");
					console.log("_________________________________");
					continue;
				} else {
					// assigning new database entry, user_id gets added via rails controller
					new userEquipment({
						name: name,
						description: description,
						equipment_id: equipment_id
					}).create();
				}
			};
			console.log("Last entry reached");
			flash.saved("Equipment");
			$state.reload();
		};

		$scope.removeEquipmentFromUser = function(id) {
			var deletedEquip;
			function findDeleted(element) {
				deletedEquip = element;
				return element.id === id;
			}
			new userEquipment({id: id}).delete();
			var deleted = $scope.userEquipments.find(findDeleted);
			var index = $scope.userEquipments.indexOf(deleted);
			$scope.userEquipments.splice(index, 1);
			flash.deleted(deletedEquip.name);
		}
}]);