app.factory('concentrations', ["railsResourceFactory", function(railsResourceFactory){
	return railsResourceFactory({
			url: '/concentration',
			name: 'concentration'
		})
}]);