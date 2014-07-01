var challenge = challenge || {};
challenge.view = challenge.view || {};

// Layout view for the exercise page

challenge.view.exercise = (function () {
  "use strict";

  var baseview = {
    init: function (model) {
      this.model = model;

      // Create sub views
      this.views = {
        problem: challenge.view.problem.create(model.problem),
        solution: challenge.view.solution.create({
          problem: model.problem
        }),
        test: challenge.view.test.create(model.test)
      };

    },
    render: function () {
      this.views.problem.$el.detach();
      this.views.solution.$el.detach();
      this.views.test.$el.detach();

      this.$el.empty().html(challenge.templates.exerciseview());

      this.$el.find('.problemarea').append(this.views.problem.$el);
      this.$el.find('.problemarea').append(this.views.solution.$el);
      this.$el.find('.testarea').append(this.views.test.$el);

      this.views.problem.render();
      this.views.solution.render();
      this.views.test.render();

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