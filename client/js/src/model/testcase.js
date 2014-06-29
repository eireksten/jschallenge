var challenge = challenge || {};
challenge.model = challenge.model || {};

challenge.model.testcase = (function () {
  "use strict";

  return {
    create: function () {
      throw new Error('Test requires arguments and expected output');
    }
  };

}());