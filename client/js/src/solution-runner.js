var solutionrunner = (function () {
  "use strict";

  var baserunner = {
    getProblem: function () {
      return this.prob;
    },

    setSolution: function (sol) {
      this.sol = sol;
    },

    createSolutionString: function (userinput) {
      userinput = userinput || this.sol;
      return this.prob.getSolutionStart() + userinput + this.prob.getSolutionEnd();
    }

  };

  var createProblem = function (prob) {

    var sr = Object.create(baserunner);

    sr.prob = prob;
    return sr;

  };

  return {
    create: createProblem
  };

}());