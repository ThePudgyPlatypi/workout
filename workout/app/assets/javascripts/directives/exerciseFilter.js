app.filter('exercise', ["randomizerFilter", function(randomizerFilter) {
	return function(exArr, difficulty, time) {
		var workoutList = exArr;
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
		
    	
    	// workoutList.push(exArr);
    	// console.log(workoutList);

		if(time === NaN || time === "") {
			unlimitedTime = true;
		}

		if (workoutList.length > workouts && !unlimitedTime) {
			workoutList.length = workouts;
		}
			
		// console.log(workoutList);
		return randomizerFilter(workoutList);
	};
}]);