var challenge = challenge || {};
challenge.model = challenge.model || {};

challenge.model.problemspec = (function () {
  "use strict";

  var baseproblem = {
    getSolutionStart: function () {
      return 'function ' + this.getFunctionName() + '(' + this.getParameterlist().join(', ') + ') {';
    },
    getSolutionEnd: function () {
      return '}';
    },
    getTitle: function () {
      return this._attributes.title;
    },
    getDescription: function () {
      return this._attributes.description;
    },
    getFunctionName: function () {
      return this._attributes.func;
    },
    getParameterlist: function () {
      return this._attributes.parameters.slice(0);
    }
  };

  var createProblem = function (args) {

    var prob = Object.create(baseproblem);

    prob._attributes = _.assign({
      title: 'Mysterious Problem',
      description: 'No description!',
      func: 'solve',
      parameters: []
    }, args);

    return prob;

  };

  return {
    create: createProblem
  };

}());