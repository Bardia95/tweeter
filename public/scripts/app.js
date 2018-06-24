$(document).ready(function() {

  // Show/hide tweet button
  $('#compose').click(function() {
    if ($(".new-tweet").is( ":hidden" ) ) {
      $(".new-tweet").slideDown();
      $("#text-area").focus();
    } else {
      $(".new-tweet").slideUp();
    }
  })

  // Escape string function for safe HTML
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Creating tweet component from submission data
  var createTweetElement = function(tweet) {
    let newHTML =
    `<article class='tweet'>
        <header>
          <img src=${tweet.user.avatars.small} alt='Avatar'>
          <h2>${tweet.user.name}</h1>
          <h4>${tweet.user.handle}</h2>
        </header>
        <p>${escape(tweet.content.text)}</p>
        <footer>
        <hr>
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

  // Render tweets
  function renderTweets(data) {
    data.forEach(element => {
      $('.container').prepend(createTweetElement(element));
    });
  };

  // Handling tweet submission
  $('#tweet-form').on('submit', function (event) {
    event.preventDefault();
    let errors = $(this).siblings('#submiterrors')
    errors.empty();
    let tweettext = $(this).find('textarea').val().trim();
    console.log(tweettext);
    // Form validation, not null, not empty, not over char limit
    if (tweettext != null && tweettext != "" && tweettext.length <= 140) {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $(this).serialize()
      }).done(function() {
        loadTweets();
      });
      $(this).find('textarea').val('');
    } else if (tweettext == null || tweettext == "") {
      errors.append("<p>Tweet can't be empty or null</p>");
    } else if (tweettext.length > 140) {
      errors.append("<p>Tweet can't be over 140 characters</p>");
    }
  });

  // Function for loading tweets from database
  function loadTweets() {
    $.get('/tweets').then(function (jsonContent) {
      $('.container').empty();
      renderTweets(jsonContent);
    });
  };

  // Load all tweets
  loadTweets();
});




