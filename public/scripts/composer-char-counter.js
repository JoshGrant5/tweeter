$(document).ready(function() {

  console.log('Ready!');

  $('#tweet-text').on('input', function() {
    let tweet = $(this); // viewed console.log of this object in devtools to get path to the value we want to change
    let count = 140 
    let chars = tweet.val().length; // Number of characters in our tweet-text value (input field)
    // Bellow is the path to the text of output tag (.counter)
    tweet[0].parentElement[2].defaultValue = count - chars;
  });
});


