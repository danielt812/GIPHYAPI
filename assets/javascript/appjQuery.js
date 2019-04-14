// GLOBAL VARIABLES
//=============================================================
// Array of gifs here
var gifList = [
  'Animals',
  'Anime',
  'Art',
  'Cartoons',
  'Design',
  'Food',
  'Gaming',
  'Memes',
  'Movies',
  'Music',
  'Nature',
  'Politics',
  'Reactions',
  'Science',
  'Sports',
  'TV'
];

var defaultGifListLength = gifList.length;

// FUNCTIONS
//======================================================
function displayGif() {
  // Empty previous 10 divs before adding 10 more..
  $('#gifs').empty();
  var gif = $(this).attr('data-name');
  // Regex to remove white space between strings
  gif = gif.replace(/\s/g, '');
  var queryURL =
    'https://api.giphy.com/v1/gifs/search?q=' +
    gif +
    '&api_key=AMEh4BzCNmxQIQdfRl5K60PbvU7r4QFn&limit=18';

  // Make AJAX call to Giphy API
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    var results = response.data;
    // Run for loop on all 10 responses
    for (var i = 0; i < results.length; i++) {
      // Give each gif a div
      var gifDiv = $('<div>');
      // Add class to gifDiv
      gifDiv.addClass('gifItem');
      // Create variable for the rating
      var rating = results[i].rating;
      // Create paragraph with item's rating
      var ratingText = $('<p>').text('Rating: ' + rating);
      // Create image tag
      var gifImage = $('<img>');
      // Give image tag src to show image
      gifImage.attr('src', results[i].images.downsized_still.url);
      // Give gif data-still attribute
      gifImage.attr('data-still', results[i].images.downsized_still.url);
      gifImage.attr('data-animate', results[i].images.downsized.url);
      gifImage.attr('data-state', 'still');
      gifImage.addClass('gifImage');
      // Append ratingText and gifImage to gifDiv
      gifDiv.append(gifImage);
      gifDiv.append(ratingText);
      // Append gifDiv to html
      $('#gifs').prepend(gifDiv);
    }
  });
}
function createButtons() {
  // Empty out buttons so it doesn't repeat
  $('#gifButtons').empty();
  // Create button for each item in array
  for (var i = 0; i < gifList.length; i++) {
    // Create button with jQuery
    var button = $('<div>');
    // Give buttons class
    button.addClass('gifButton');
    // Give buttons data attribute
    button.attr('data-name', gifList[i]);
    // Give buttons text
    button.text(gifList[i]);
    // Append buttons to html
    $('#gifButtons').append(button);
  }
}
// ON CLICK EVENT FUNCTIONS
//======================================================
// On click function on buttons that will add new button
$('#addGif').on('click', function(event) {
  event.preventDefault();
  // Grab input from html
  var gif = $('#gifInput')
    .val()
    .trim();
  if (gif === '') {
    return;
  } else {
    // Add to gifArray
    gifList.push(gif);
    // Empty value in input box
    $('#gifInput').val('');
    // Call createButtons function to update new button
    createButtons();
  }
});

$('#removeCategory').on('click', function(event) {
  event.preventDefault();
  if (gifList.length === defaultGifListLength) {
    return;
  }
  gifList.pop();
  createButtons();
});

$(document).on('keydown', function(event) {
  // Document listening for backspace/delete
  if (event.keyCode === 8) {
    // If event target is input tag return
    if (
      event.target.tagName.toUpperCase() === 'INPUT' ||
      gifList.length === defaultGifListLength
    ) {
      return;
    }
    // If event target is not input pop last gif category from array
    gifList.pop();
    createButtons();
  }
});

// document.addEventListener('keyup', function(event) {
//   console.log(event);
// });

$('body').on('click', '.gifImage', function() {
  // Make variable to see if image is still or animated
  var state = $(this).attr('data-state');
  // Change img src to animate version if it is still
  if (state === 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    // Change data-state of gif to animate
    $(this).attr('data-state', 'animate');
  }
  // Changes animate state back to still
  else {
    $(this).attr('src', $(this).attr('data-still'));
    // Change data-state of gif to still
    $(this).attr('data-state', 'still');
  }
});

$(document).on('click', '.gifButton', displayGif);

createButtons();
