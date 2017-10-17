app.filter('exercise', ["randomizerFilter", function(randomizerFilter) {
	return function(exArr, eqArr, difficulty, time) {
		var workoutList = [];
		var unlimitedTime = false;
		// console.log("---------------------");
		// console.log(difficulty);
		// console.log(time);
		var workouts = Math.round(time/difficulty);
		// console.log(workouts);
		
    	// console.log(eId);
    	exArr.filter(function(entry) {
    		if (this.indexOf(entry.equipmentId) !== -1) {
    			workoutList.push(entry);
    		}
		}, eqArr);

		if(time === NaN || time === "") {
			unlimitedTime = true;
		}

    	if(workoutList) {
    		if (workoutList.length > workouts && !unlimitedTime) {
				workoutList.length = workouts;
			}
			workoutList = randomizerFilter(workoutList);
    	}
		// console.log(workoutList);
		return workoutList;
	};
}]);