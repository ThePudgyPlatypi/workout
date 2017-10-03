app.factory('exercise', ['railsResourceFactory', function(railsResourceFactory){
	return railsResourceFactory({
		url: '/exercise',
		name: 'exercise'
	})
}])