app.filter("randomizer", function() {
// the Fisher-Yates (aka Knuth) Shuffle.
// using underscore.js library to bring in memoize method so that there are no more digest errors
	return _.memoize(function shuffle(array) {
		console.log(array)
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;

	});
});