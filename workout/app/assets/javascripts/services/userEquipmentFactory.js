app.factory('userEquipment', ['railsResourceFactory', function(railsResourceFactory) {
	return railsResourceFactory ({
			url: '/user_equipment',
			name: 'user_equipment'
		});
}])