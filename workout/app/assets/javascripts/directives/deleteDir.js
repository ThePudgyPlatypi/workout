app.directive("delete", [function() {
	return {
		restrict: 'E',
		scope: {
			id: '=',
			array: '='
		},
		link: function(scope, elem, attrs) {

		}
	}
}]);