app.filter('exercise', ["randomizerFilter", function(randomizerFilter) {
	return function(exArr, eqArr, difficulty, time) {
		var workoutList = [];
		var unlimitedTime = false;
		// console.log("---------------------");
		// console.log(difficulty);
		// console.log(time);
		var difficultyArr = [{
			name: "easy",
			value: 5
		}, {
			name: "standard",
			value: 3.5
		}, {
			name: "advanced",
			value: 2
		}]

		for (var i=0; i < difficultyArr.length; i++) {
			if (difficultyArr[i].name == difficulty) {
				difficulty = difficultyArr[i].value;
			}
			// console.log(difficulty);
		};

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