app.factory('flash',['flashr', function(flashr) {
	var flash = {};

	flash.saved = function(name) {
		flashr.now.success(name + ' successfully saved.', "Saved");
	}

	flash.deleted = function(name) {
		flashr.now.success(name + ' successfully deleted');
	}

	flash.error = function(string, error) {
		flashr.now.error(string + ". Error = " + error);
	}

	return flash;
}])