$(document).ready(function() {
  var d = new Date();
  var time = d.getTime();
  var createTweetElement = function(tweet) {
    let newHTML =
    `<article class='tweet'>
        <header>
          <img src=${tweet.user.avatars.small} alt='Avatar'>
          <h2>${tweet.user.name}</h1>
          <h4>${tweet.user.handle}</h2>
        </header>
        <p>${tweet.content.text}</p>
        <hr>
        <footer>
          <div class='timeposted'>
            ${moment(tweet.created_at).fromNow()}
          </div>
          <div class='icons'>
            <i class='fas fa-flag'></i>
            <i class='fas fa-retweet'></i>
            <i class='fas fa-heart'></i>
          </div>
        </footer>
      </article>`
    return newHTML;
  }

  function renderTweets(data) {
    data.forEach(element => {
          $('.container').append(createTweetElement(element));
    });
  };

  $('#tweet-form').on('submit', function (event) {
      event.preventDefault();
      $.ajax({
          method: 'POST',
          url: '/tweets',
          data: $(this).serialize()
      }).done(function () {
          renderTweets(data);
      });
  });

  function loadTweets() {
    $.get('/tweets').then(function (jsonContent) {
        renderTweets(jsonContent);
    });
  };

  loadTweets();

  // Tweet hover function
  $(".tweet").hover(function() {
    $(this).addClass("highlight");
  }, function(){
    $(this).removeClass("highlight");
  });

  // Icon hover function
  $(".fas").hover(function() {
    console.log(this);
    $(this).addClass("iconHighlight");
  }, function() {
    console.log(this);
    $(this).removeClass("iconHighlight");
  });
});




