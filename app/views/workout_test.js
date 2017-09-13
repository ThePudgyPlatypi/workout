'use strict';

describe('myApp.workout module', function() {

  beforeEach(module('myApp.workout'));

  describe('workout controller', function(){

    it('should ....', inject(function($controller, $scope) {
      //spec body
      var workoutController = $controller('WorkoutController');
 
      expect(workoutController).toBeDefined();

    }));

  });
});