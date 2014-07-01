var challenge = challenge || {};

Zepto(function () {
  "use strict";

  var models = challenge.model;
  var views = challenge.view;

  $('.challenge').each(function () {
    var $challenge = $(this);

    var problem = models.problemspec.create({
      title: "Addition",
      description: "You are given two numbers as parameters to your function. Return the result of adding them.",
      func: "addThem",
      parameters: ['x', 'y']
    });

    var exerciseview = views.exercise.create({
      problem: problem
    });
    
    $('.challenge').append(exerciseview.$el);
    exerciseview.render();
  });

  

});