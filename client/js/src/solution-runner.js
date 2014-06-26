var challenge = challenge || {};

challenge.solutionrunner = (function () {
  "use strict";

  function makeWorker(script) {
    var URL = window.URL || window.webkitURL;
    
    var blob = new Blob([script]);
    var worker = new Worker(URL.createObjectURL(blob));
    return worker;
  }

  var baserunner = {
    getProblem: function () {
      return this.prob;
    },

    setSolution: function (sol) {
      this.sol = sol;
    },

    createSolutionString: function (userinput) {
      userinput = userinput || this.sol;
      return '(function (' +
        this.prob.getParameterlist().join(', ') +
        ') {' +
        userinput +
        '})';
    },

    run: function (callback) {
      var runnerworker = makeWorker('self.addEventListener("message",function(event){try{self.postMessage({output:eval(event.data.solution)()});}finally{self.close()}})'),
      // var runnerworker = new Worker('webworkers/judge-worker.js'),
          timeout = setTimeout(function () {
            runnerworker.terminate(runnerworker);
            callback("The solution timed out.");
          }, 1000);

      runnerworker.addEventListener('message', this.handleWorkerResult.bind(this, callback, timeout));
      runnerworker.addEventListener('error', this.handleWorkerError.bind(this, callback, timeout));

      runnerworker.postMessage({
        solution: this.createSolutionString()
      });
      
    },

    handleWorkerResult: function (callback, timeout, event) {
      var output = event.data.output;

      callback(null, output);

      clearTimeout(timeout);

    },

    handleWorkerError: function (callback, timeout, event) {
      event.preventDefault();

      callback(event.message);

      clearTimeout(timeout);
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