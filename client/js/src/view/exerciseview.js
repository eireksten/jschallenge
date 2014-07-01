var challenge = challenge || {};
challenge.view = challenge.view || {};

// Layout view for the exercise page

challenge.view.exercise = (function () {
  "use strict";

  var baseview = {
    init: function (model) {
      this.model = model;
    },
    render: function () {

    }
  };

  var createView = function (model) {
    var view = Object.create(baseview);

    view.$el = $('<section class="exercise">');
    view.el = view.$el.get(0);

    view.init(model);

    return view;
  };

  return {
    create: createView
  };

}());