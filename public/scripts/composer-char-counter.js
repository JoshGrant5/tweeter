$(document).ready(function() {

  // Update character count of tweet and turn the count red if tweet exceeds char limit
  $('#tweet-text').on('input', function() {
    const tweet = $(this); 
    const chars = tweet.val().length; 
    $('#counter')[0].innerHTML = 140 - chars;

    if (chars > 140) {
      $('.counter').css({color: 'red'});
    } else {
      $('.counter').css({color: '#545149'});
    }
  });
});