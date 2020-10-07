$(document).ready(function() {

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

  //* Initial solution
  // $('form').on('submit', function(event) {
  //   event.preventDefault();
  //   const tweet = $(this).serialize();
  //   $.ajax({
  //     type: 'POST',
  //     url: '/tweets', 
  //     data: tweet,
  //     success: function(newTweet) {
  //       $('#tweets-container').append(newTweet);
  //     },
  //     error: function() {
  //       alert('Error Posting Tweet');
  //     }
  //   });
  // });

  // AJAX POST Request
  $('form').on('submit', function(event) {
    event.preventDefault();
    const tweet = $(this).serialize();
    $.ajax('/tweets', { method: 'POST' , data: tweet })
    .then(function(newTweet) {
      console.log('Success! Tweet posted: ', newTweet);
    }).catch(function() {
      alert('Error! Could not post tweet');
    })
  });

  // AJAX GET Request
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
    .then(function(tweets) {
      console.log('Success! Tweet posted: ', tweets);
      renderTweets(tweets);
    }).catch(function() {
      alert('Error! Could not find tweets');
    })
  };

  loadTweets();

});

