/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $(".tweet").hover(function() {
    $(this).addClass("highlight");
  }, function(){
    $(this).removeClass("highlight");
  });
  $(".fas").hover(function() {
    console.log(this);
    $(this).addClass("iconHighlight");
  }, function() {
    console.log(this);
    $(this).removeClass("iconHighlight");
  });
});




