var challenge = challenge || {};
challenge.model = challenge.model || {};

challenge.model.testcase = (function () {
  "use strict";

  var createTestCase = function (args) {
      if (!_.has(args, 'output') || !_.has(args, 'arguments')) {
        throw new Error('Test requires arguments and expected output');
      }

      var tc = Object.create({});
      _.assign(tc, challenge.modelmixin);
      _.forOwn(
        args,
        function (value, key) {
          tc.set(key, value);
        }
      );

      return tc;

  }

  return {
    create: createTestCase
  };

}());