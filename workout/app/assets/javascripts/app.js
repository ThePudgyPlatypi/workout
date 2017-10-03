var app = angular.module('workout', ['ui.router', 'templates', 'Devise', 'rails']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
		url: "/home",
		templateUrl: "views/_home.html",
		controller: "MainCtrl"
	}).state('workoutStart', {
		url: "/workoutSetup", 
		templateUrl: "views/_workoutSetup.html",
		controller: "WorkoutEngineCtrl"
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
	}).state('equipSetup', {
		url: "/equip/setup",
		templateUrl: "views/_equipSetup.html",
		controller: "UserEquipmentCtrl",
	}).state('equipEdit', {
		url: "/equip/edit",
		templateUrl: "views/_equipEdit.html",
		controller: "UserEquipmentCtrl",
	})

	$urlRouterProvider.otherwise('login');
}]);

