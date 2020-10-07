/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const createTweetElement = data => {
    return `
    <br>
    <article>
      <header>
        <div class='tweet-avatar'>
          <img name='tweet-av' src=${data.user.avatars}>
          <p name='tweet-name'>${data.user.name}</p>
        </div>
        <p name='tweet-handle' class='enhance'>${data.user.handle}</p>
      </header>
      <p name='tweet-content' class='tweet'>${data.content.text}</p>
      <footer>
        <p name='tweet-date'>${data.created_at}</p>
        <p>Like buttons</p>
      </footer>
    </article>
    <br>`
  };

  const renderTweets = list => {
    for (item of list) {
      let tweet = createTweetElement(item);
      $('#tweets-container').append(tweet);
    }
  };

  renderTweets(data);

  $('form').on('submit', function(event) {
    event.preventDefault();
    let tweet = $(this).serialize();
    
    $.ajax({
      type: 'POST',
      url: '/tweets/', 
      data: tweet,
      success: function(newTweet) {
        // console.log(createTweetElement(tweet))
        $('#tweets-container').append(newTweet);
      },
      error: function() {
        alert('Error Posting Tweet');
      }
    });
  });

});

