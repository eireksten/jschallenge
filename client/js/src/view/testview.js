var challenge = challenge || {};
challenge.view = challenge.view || {};

challenge.view.test = (function () {
  "use strict";

  var baseview = {
    init: function (model) {
      this.model = model;
    },
    render: function () {
      this.$el.empty().html(challenge.templates.testsuite({

      }));
    }
  };

  var createView = function (model) {
    var view = Object.create(baseview);

    view.$el = $('<section class="testview">');
    view.el = view.$el.get(0);

    view.init(model);

    return view;

  };

  return {
    create: createView
  };

}());