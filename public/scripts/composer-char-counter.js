let maxChar = 140;

$(document).ready(function() {
  $('textarea').bind('input', function() {
    let counter = $(this).val().length;
    let charLeft = maxChar - counter;
    $(this).siblings('.counter').html(maxChar - counter);
    if (charLeft < 0) {
      $(this).siblings('.counter').css('color', 'red');
    }
  })
});