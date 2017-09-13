'use strict';

angular.module('myApp.workout', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/workout', {
    templateUrl: 'views/workout.html',
    controller: 'WorkoutController'
  });
}])

.controller('WorkoutController', ["$scope", function($scope) {
	$scope.equipment = {
		dumbells : {
			name : "Dumbells",
			selected : false
		},
		benchPress : {
			name : "Bench Press",
			selected : false
		},
		pullUpBar : {
			name : "Pull Up Bar",
			selected : false
		}
	}
}]);