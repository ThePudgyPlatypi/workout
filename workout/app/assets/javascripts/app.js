var app = angular.module('workout', ['ui.router', 'templates', 'Devise']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
		url: "/home",
		templateUrl: "views/_home.html",
		controller: "MainCtrl"
	}).state('workoutStart', {
		url: "/workoutSetup", 
		templateUrl: "views/_workoutSetup.html",
		controller: "WorkoutEngineCtrl",
		resolve: {
			concentrations: ['concentrations', function(concentrations) {
				return concentrations.getAll();
			}]
		}
	})

	$urlRouterProvider.otherwise('home');
}]);

