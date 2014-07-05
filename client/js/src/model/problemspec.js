var challenge = challenge || {};
challenge.model = challenge.model || {};

challenge.model.problemspec = (function () {
  "use strict";

  var baseproblem = {
    getSolutionStart: function () {
      return 'function ' + this.get('func') + '(' + this.get('parameters').join(', ') + ') {';
    },
    getSolutionEnd: function () {
      return '}';
    }
  };

  var createProblem = function (args) {

    var prob = Object.create(baseproblem);
    _.assign(prob, challenge.modelmixin);

    _.forOwn(
      _.assign({
        title: 'Mysterious Problem',
        description: 'No description!',
        func: 'solve',
        parameters: []
      }, args),
      function (value, key) {
        prob.set(key, value);
      }
    );

    return prob;

  };

  return {
    create: createProblem
  };

}());