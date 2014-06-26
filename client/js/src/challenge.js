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
  var $container = $('#challenge');
  $container.append(problemview.$el);

});