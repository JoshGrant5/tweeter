$(document).ready(function() {

  console.log('Ready!');

  $('#tweet-text').on('input', function() {
    const tweet = $(this); // grab the textarea element
    const chars = tweet.val().length; // Number of characters in our tweet-text value (input field)
    const count = $('#counter')[0].innerHTML; // we access the #counter object, and need it's key [0] to access the innerHTML
    $('#counter')[0].innerHTML = 140 - chars;

    if (count < 0) {
      $('.counter').css({color: 'red'});
    }
  });
});