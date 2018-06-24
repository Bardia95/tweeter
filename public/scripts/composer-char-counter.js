let maxChar = 140;

// Make character counter for tweets go red after 140 characters
$(document).ready(function() {
  $('textarea').bind('input', function() {
    let charLeft = maxChar - $(this).val().length;
    $(this).siblings('.counter').html(charLeft);
    if (charLeft < 0) {
      $(this).siblings('.counter').css('color', 'red');
    }
  })
});