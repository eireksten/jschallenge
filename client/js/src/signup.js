/*global console */

$(function () {
  "use strict";

  $('.signup form').each(function () {
    var $form = $(this),
        $pass = $form.find('input[name=password]'),
        $pcon = $form.find('input[name=passconfirm]'),
        checkpass = function () {
          if ($pass.val() === $pcon.val() && $pass.val().length > 0) {
            $pcon.removeClass('mismatch');
            $pcon.addClass('match');
          } else {
            $pcon.addClass('mismatch');
            $pcon.removeClass('match');
          }
        };

    checkpass();

    $pass.keyup(checkpass);
    $pcon.keyup(checkpass);

    $form.submit(function () {
      checkpass();

      if ($pass.val() === $pcon.val() && $pass.val().length > 0) {  
        return true;
      }

      $pass.focus();
      return false;
    });
  });
});