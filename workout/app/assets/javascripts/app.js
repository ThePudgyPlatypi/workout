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
			promise: ['concentrations', function(concentrations) {
				return concentrations.getAll();
			}]
		}
	}).state('login', {
		url: "/login",
		templateUrl: "views/_login.html",
		controller: "AuthCtrl",
		onEnter: ["$state", "Auth", function($state, Auth) {
			Auth.currentUser().then(function() {
				$state.go('home');
			});
		}]
	}).state('register', {
		url: "/register",
		templateUrl: "views/_register.html",
		controller: "AuthCtrl",
		onEnter: ["$state", "Auth", function($state, Auth) {
			Auth.currentUser().then(function() {
				$state.go('home');
			});
		}]
	})

	$urlRouterProvider.otherwise('login');
}]);

