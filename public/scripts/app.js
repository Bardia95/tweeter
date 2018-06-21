$(document).ready(function() {

  $('#compose').click(function() {
    if ($(".new-tweet").is( ":hidden" ) ) {
      $(".new-tweet").slideDown();
      $("#text-area").focus();
    } else {
      $(".new-tweet").slideUp();
    }
  })

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
        <p>${escape(tweet.content.text)}</p>
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
      $('.container').prepend(createTweetElement(element));
    });
  };

  $('#tweet-form').on('submit', function (event) {
    event.preventDefault();
    let errors = $(this).siblings('#submiterrors')
    errors.empty();
    let tweettext = $(this).find('textarea').val().trim();
    // Form validation, not null, not empty, not over char limit
    if (tweettext != null && tweettext != "" && tweettext != " " && tweettext.length <= 140) {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $(this).serialize()
      }).done(function() {
        loadTweets();
      });
    } else if (tweettext == null || tweettext == "" || $tweettext == " ") {
      errors.append("<p>Tweet can't be empty or null</p>");
    } else if (tweettext.length <= 140) {
      errors.append("<p>Tweet can't be over 140 characters</p>");
    }
  });

  function loadTweets() {
    $.get('/tweets').then(function (jsonContent) {
        $('.container').empty();
        renderTweets(jsonContent);
    });
  };

  loadTweets();
});




