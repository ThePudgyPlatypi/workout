var app = angular.module('workout', ['ui.router', 'templates', 'Devise']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
		url: "/home",
		templateUrl: "views/_home.html.erb",
		controller: "MainCtrl"
	})
}]);

