app.factory('equipment', ["railsResourceFactory", function(railsResourceFactory){
	return railsResourceFactory ({
		url: '/equipment',
		name: 'equipment'
	}); 
}])