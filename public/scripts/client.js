$(document).ready(function() {

  // Prevent XSS attacks from user input
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Create the html template for the new tweet
  const createTweetElement = data => {
    let timestamp = new Date(data.created_at);
    const date = timestamp.toDateString();
    return `
    <br>
    <article>
      <header>
        <div class='tweet-avatar'>
          <img src=${data.user.avatars}>
          <p>${data.user.name}</p>
        </div>
        <p class='enhance'>${data.user.handle}</p>
      </header>
      <p class='tweet'>${escape(data.content.text)}</p>
      <footer>
        <p>${date}</p>
        <div class='icons'>
          <span class="iconify" data-icon="clarity:flag-solid" data-inline="false"></span>
          <span class="iconify" data-icon="ps:retweet" data-inline="false"></span>
          <span class="iconify" data-icon="bi:suit-heart-fill" data-inline="false"></span>
        </div>
      </footer>
    </article>
    <br>`
  };

  // Create html template for each tweet in db, showing newest tweets first
  const renderTweets = list => {
    for (item of list) {
      let tweet = createTweetElement(item);
      $('#tweets-container').prepend(tweet); 
    }
  };

  // Make an AJAX GET request to display the user's tweet immediatley after they post it 
  const loadNewTweet = () => {
    $.ajax('/tweets', { method: 'GET' })
    .then(function(tweets) {
      const tweet = createTweetElement(tweets[tweets.length - 1]);
      $('#tweets-container').prepend(tweet);
    }).catch(function() {
      alert('Error! Could not find tweet');
    })
  };

  // AJAX POST Request for each time the user posts a tweet
  $('form').on('submit', function(event) {
    event.preventDefault();
    $('#error').slideUp(600); // if error message is displayed, hide it as soon as new tweet is posted
    const tweet = $(this).serialize(); 
    // Check that the tweet is valid
    const validateTweet = $('#tweet-text').val();
    if (!validateTweet) { // Tweet is empty
      $('#error').text('Uh oh! Cannot post empty tweet!');
      $('#error').slideDown(600);
    } else if (validateTweet.length > 140) { 
      $('#error').text('Uh oh! Your tweet is too long!');
      $('#error').slideDown(600);
    } else { 
      $.ajax('/tweets', { method: 'POST' , data: tweet })
      .then(function() {
        $('.new-tweet').slideUp(800);
        loadNewTweet(); 
        $('#tweet-text').val(''); // Clear input field
        $('#counter')[0].innerHTML = 140; // Reset char counter to 140
      }).catch(function() {
        alert('Error! Could not post tweet');
      })
    }
  });

  // AJAX GET Request to load tweets for feed
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
    .then(function(tweets) {
      renderTweets(tweets);
    }).catch(function() {
      alert('Error! Could not find tweets');
    })
  };

  loadTweets();

  // Button on right of navbar displays the new tweet form
  $('.nav-right').on('click', function() {
    if ($('.new-tweet').css('display') === 'none') {
      $('.new-tweet').slideDown(600, function() {
        $('#tweet-text').focus();
      });
    } else { // Second click of button will hide new tweet form
      $('.new-tweet').slideUp(600, function() {
        $('#tweet-text').focus();
      });
    }
  });

  // Scroll-to-top button dispalys once user begins scrolling
  $(window).on('scroll', function() {
    $('#scroll-to-top').show(600);
    $('.nav-right').hide();
  });

  // Scroll-to-top button hides on click and displays tweet form once taken back to top
  $('#scroll-to-top').on('click', function() {
    $('html, body').animate({scrollTop:0}, '300', function() {
      $('.nav-right').show();
      $('#scroll-to-top').hide();
      $('.new-tweet').slideDown(600, function() {
        $('#tweet-text').focus();
      });
    });
  });

});