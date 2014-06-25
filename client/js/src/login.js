$(function () {
  "use strict";

  var $loginform = $('.loginform'),
      $signupform = $('.signupform'),
      $newUserRadio = $('input[name="newuser"]');

  $signupform.hide();

  $newUserRadio.change(function () {
    $signupform.toggle();
    $loginform.toggle();
  });

});