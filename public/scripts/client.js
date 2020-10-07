$(document).ready(function() {

  // Test to prevent XSS attacks from user input
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = data => {
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
        <p>${data.created_at}</p>
        <p>Like buttons</p>
      </footer>
    </article>
    <br>`
  };

  const renderTweets = list => {
    for (item of list) {
      let tweet = createTweetElement(item);
      $('#tweets-container').prepend(tweet); // makes tweet the first element in the array (new tweets first)
    }
  };

  const loadNewTweet = () => {
    $.ajax('/tweets', { method: 'GET' })
    .then(function(tweets) {
      const tweet = createTweetElement(tweets[tweets.length - 1]);
      $('#tweets-container').prepend(tweet);
    }).catch(function() {
      alert('Error! Could not find tweet');
    })
  }

  // AJAX POST Request
  $('form').on('submit', function(event) {
    event.preventDefault(); // prevent our form from reloading the page on submit
    $('#error').slideUp(600);
    const tweet = $(this).serialize(); 
    // Check that the tweet is valid
    const validateTweet = $('#tweet-text').val();
    if (!validateTweet) { // Tweet is empty
      $('#error').text('Uh oh! Cannot post empty tweet!')
      $('#error').slideDown(600);
    } else if (validateTweet.length > 140) { 
      $('#error').text('Uh oh! Your tweet is too long!')
      $('#error').slideDown(600);
    } else { 
      $.ajax('/tweets', { method: 'POST' , data: tweet })
      .then(function() {
        loadNewTweet(); // Reload tweet container without refreshing the page
        $('.new-tweet').slideUp(1200);
        $('#tweet-text').val(''); // Clear input field
        $('#counter')[0].innerHTML = 140; // Reset char counter to 140
      }).catch(function() {
        alert('Error! Could not post tweet');
      })
    }
  });

  // AJAX GET Request
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
    .then(function(tweets) {
      renderTweets(tweets);
    }).catch(function() {
      alert('Error! Could not find tweets');
    })
  };

  loadTweets();

  $('.nav-right').on('click', function() {
    $('.new-tweet').slideDown(600, function() {
      $('#tweet-text').focus();
    });
  });

  $(window).on('scroll', function() {
    $('#scroll-to-top').slideDown(600);
    $('.nav-right').hide();
  });

  $('#scroll-to-top').on('click', function() {
    $('html, body').animate({scrollTop:0}, '300', function() {
      $('.nav-right').show();
      $('.new-tweet').slideDown(600, function() {
        $('#tweet-text').focus();
      });
    });
  });

});

