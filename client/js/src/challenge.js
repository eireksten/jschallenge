var challenge = challenge || {};

Zepto(function () {
  "use strict";

  var problem = challenge.problem.create({
    title: "Addition",
    description: "Add two numbers",
    func: "addThem",
    parameters: ['x', 'y']
  });

  var problemview = challenge.problemview.create(problem);
  $('#challenge').append(problemview.$el);
  problemview.render();

});