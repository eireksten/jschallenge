var challenge = challenge || {};

challenge.problemview = (function () {
  "use strict";

  var baseview = {
    init: function (model) {
      this.model = model;
    },
    render: function () {
      this.$el.empty().html(challenge.templates.problem({
        title: this.model.getTitle(),
        description: this.model.getDescription()
      }));
    }
  };

  var createView = function (model) {
    var view = Object.create(baseview);

    view.$el = $('<div class="problemview">');
    view.el = view.$el.get(0);

    view.init(model);
    view.render();

    return view;

  };

  return {
    create: createView
  };

}());