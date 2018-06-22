let maxChar = 140;

// Make character counter for tweets go red after 140 characters
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