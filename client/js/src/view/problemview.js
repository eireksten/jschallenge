var challenge = challenge || {};
challenge.view = challenge.view || {};

challenge.view.problem = (function () {
  "use strict";

  var baseview = {
    init: function (model) {
      this.model = model;
    },
    render: function () {
      this.$el.empty().html(challenge.templates.problem({
        title: this.model.get('title'),
        description: this.model.get('description')
      }));
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

}());