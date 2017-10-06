app.directive('confirm', [function() {
	return {
		priority: 100,
		restrict: "A",
		link: {
			pre: function(scope, elements, attrs) {
					var msg = attrs.confirm || "Are you sure?";

					element.bind('click', function (event) {
                        if (!confirm(msg)) {
                            event.stopImmediatePropagation();
                            event.preventDefault;
                        }
                    });
			}
		}
	}
}]);