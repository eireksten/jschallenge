/*global CodeMirror */

var challenge = challenge || {};

challenge.problemview = (function (codemirror) {
  "use strict";

  var baseview = {
    init: function (model) {
      this.model = model;
    },
    render: function () {
      this.$el.empty().html(challenge.templates.problem({
        title: this.model.getTitle(),
        description: this.model.getDescription(),
        precode: this.model.getSolutionStart(),
        postcode: this.model.getSolutionEnd()
      }));

      this.$el.find('.editor').each(function () {
        codemirror(this, {
          value: "function myScript(){return 100;}\n",
          mode:  "javascript",
          theme: "solarized light",
          lineNumbers: true
        });  
      });

    }
  };

  var createView = function (model) {
    var view = Object.create(baseview);

    view.$el = $('<section class="problemview">');
    view.el = view.$el.get(0);

    view.init(model);

    return view;

  };

  return {
    create: createView
  };

}(CodeMirror));