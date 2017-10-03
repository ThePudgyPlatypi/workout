app.controller("WorkoutEngineCtrl", [
	"$scope",  
	"equipment", 
	"userEquipment", 
	"Auth",
	function($scope, equipment, userEquipment, Auth) {
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

		// User equipment
		userEquipment.query({user_id: $scope.user}).then(function(results){
			$scope.userEquipments = results;
			$scope.searching = false;
		});
}])