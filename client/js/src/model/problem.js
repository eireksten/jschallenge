var challenge = challenge || {};
challenge.model = challenge.model || {};

challenge.model.problem = (function () {
  "use strict";

  var baseproblem = {
    getSolutionStart: function () {
      return 'function ' + this.getFunctionName() + '(' + this.getParameterlist().join(', ') + ') {';
    },
    getSolutionEnd: function () {
      return '}';
    },
    testCount: function () {
      return this.tests().length;
    },
    addTest: function (test) {
      this.tests().push(test);
    },
    getTest: function (index) {
      return this.tests()[index];
    },
    removeTest: function (test) {
      this.tests(_.without(this.tests(), test));
    }
  };

  var createProblem = function (args) {

    args = _.assign({
      title: 'Mysterious Problem',
      description: 'No description!',
      func: 'solve',
      parameters: []
    }, args);

    var prob = Object.create(baseproblem),
        tests = [];

    return _.assign(prob, {
      getTitle: function () {
        return args.title;
      },
      getDescription: function () {
        return args.description;
      },
      getFunctionName: function () {
        return args.func;
      },
      getParameterlist: function () {
        return args.parameters.slice(0);
      },
      tests: function (testlist) {
        if (testlist) {
          tests = testlist;
        }
        return tests;
      }
    });

  };

  return {
    create: createProblem
  };

}());