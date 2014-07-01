/*global CodeMirror */

var challenge = challenge || {};
challenge.view = challenge.view || {};

challenge.view.solution = (function (codemirror) {
  "use strict";

  var baseview = {
    init: function (model) {
      this.model = model;
    },
    render: function () {
      this.$el.empty().html(challenge.templates.solutionview({
        precode: this.model.problem.getSolutionStart(),
        postcode: this.model.problem.getSolutionEnd(),
      }));

      this.$el.find('.editor').each(function () {
        codemirror(this, {
          value: "return 0;",
          mode:  "javascript",
          theme: "solarized light",
          lineNumbers: true,
          firstLineNumber: 2
        });  
      });

    }
  };

  var createView = function (model) {
    var view = Object.create(baseview);

    view.$el = $('<section class="solution">');
    view.el = view.$el.get(0);

    view.init(model);

    return view;

  };

  return {
    create: createView
  };

}(CodeMirror));