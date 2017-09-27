app.factory('concentrations', ["$http", function($http){
	var obj = {
		concentrations: []
	};

	obj.getAll = function() {
		return $http.get('/concentration.json').then(function(response) {
			angular.copy(response.data, obj.concentrations);
		});
	};

	return obj;
}]);