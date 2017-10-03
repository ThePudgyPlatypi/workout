app.factory('user', ["railsResourceFactory", function(railsResourceFactory){
	return railsResourceFactory({
		url: '/user',
		name: 'user'
	})
}])