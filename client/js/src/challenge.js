var challenge = challenge || {};

Zepto(function () {
  "use strict";

  var models = challenge.model;
  var views = challenge.view;

  var problem = models.problemspec.create({
    title: "Addition",
    description: "Add two numbers",
    func: "addThem",
    parameters: ['x', 'y']
  });

  var problemview = views.problem.create(problem);
  $('#challenge').append(problemview.$el);
  problemview.render();

});