/*global self */
/*jshint evil: true */


var runSolution = function (event) {
  "use strict";

  var solfunc = eval(event.data.solution);
  try {
    self.postMessage({
      output: solfunc()
    });
  } finally {
    self.close();
  }

};

self.addEventListener('message', runSolution);