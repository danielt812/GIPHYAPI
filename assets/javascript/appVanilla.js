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
function getElementById(element) {
  return document.getElementById(element);
}

function displayGif(attribute) {
  // Empty previous 10 divs before adding 10 more..
  var gifs = getElementById('gifs');
  while (gifs.firstChild) gifs.removeChild(gifs.firstChild);
  var gif = attribute;
  // Regex to remove white space between strings
  gif = gif.replace(/\s/g, '');
  var queryURL =
    'https://api.giphy.com/v1/gifs/search?q=' +
    gif +
    '&api_key=AMEh4BzCNmxQIQdfRl5K60PbvU7r4QFn&limit=18';

  // Make AJAX call to Giphy API
  // Set up our HTTP request
  var xhr = new XMLHttpRequest();

  // Setup our listener to process completed requests
  xhr.onload = function() {
    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
      // What do when the request is successful
      var response = JSON.parse(xhr.responseText);
      var data = response.data;
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        // Give each gif a div
        var gifDiv = document.createElement('div');
        // Add class to gifDiv
        gifDiv.classList.add('gifItem');
        // Create variable for the rating
        var rating = data[i].rating;
        // Create paragraph with item's rating
        var ratingText = document.createElement('p');
        ratingText.textContent = 'Rating: ' + rating;
        // Create image tag
        var gifImage = document.createElement('img');
        // Give image tag src to show image
        gifImage.setAttribute('src', data[i].images.downsized_still.url);
        // Give gif data-still attribute
        gifImage.setAttribute('data-still', data[i].images.downsized_still.url);
        gifImage.setAttribute('data-animate', data[i].images.downsized.url);
        gifImage.setAttribute('data-state', 'still');
        gifImage.classList.add('gifImage');
        // Append ratingText and gifImage to gifDiv
        gifDiv.appendChild(gifImage);
        gifDiv.appendChild(ratingText);
        // Append gifDiv to html
        var gifs = getElementById('gifs');
        gifs.insertBefore(gifDiv, gifs.firstChild);
      }
    } else {
      // What do when the request fails
      console.log('The request failed!');
    }
  };
  xhr.open('GET', queryURL);
  xhr.send();
}

function createButtons() {
  // Empty out buttons so it doesn't repeat
  var gifButtons = getElementById('gifButtons');
  while (gifButtons.firstChild) gifButtons.removeChild(gifButtons.firstChild);
  // Create button for each item in array
  for (var i = 0; i < gifList.length; i++) {
    // Create button with jQuery
    var button = document.createElement('div');
    // Give buttons class
    button.classList.add('gifButton');
    // Give buttons data attribute
    button.setAttribute('data-name', gifList[i]);
    // Give buttons text
    button.textContent = gifList[i];
    // Append buttons to html
    gifButtons.append(button);
  }
}
// ON CLICK EVENT FUNCTIONS
//======================================================
// On click function on buttons that will add new button
var addGif = getElementById('addGif');
addGif.addEventListener('click', function(event) {
  event.preventDefault();
  var gifElement = getElementById('gifInput');
  var gif = gifElement.value;
  gif = gif.trim();
  if (gif === '') {
    return;
  } else {
    // Add to gifArray
    gifList.push(gif);
    // Empty value in input box
    gifElement.value = '';
    // Call createButtons function to update new button
    createButtons();
  }
});

var removeCategory = getElementById('removeCategory');
removeCategory.addEventListener('click', function(event) {
  event.preventDefault();
  // If gifList length is at original length don't pop
  if (gifList.length === defaultGifListLength) {
    return;
  }
  gifList.pop();
  createButtons();
});

document.addEventListener('keydown', function(event) {
  // Document listening for backspace/delete
  if (event.keyCode === 8) {
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

document.addEventListener('click', function(event) {
  if (event.target && event.target.classList[0] === 'gifImage') {
    var image = event.target;
    // Make variable to see if image is still or animated
    var state = image.getAttribute('data-state');
    var imageStill = image.getAttribute('data-still');
    var imageAnimate = image.getAttribute('data-animate');

    // Change img src to animate version if it is still
    if (state === 'still') {
      image.setAttribute('src', imageAnimate);
      // Change data-state of gif to animate
      image.setAttribute('data-state', 'animate');
    } else {
      // Change img src to still version if it is animate
      image.setAttribute('src', imageStill);
      // Change data-state of gif to still
      image.setAttribute('data-state', 'still');
    }
  }
});

document.addEventListener('click', function(event) {
  if (event.target && event.target.classList.value === 'gifButton') {
    var target = event.target;
    var attribute = target.getAttribute('data-name');
    displayGif(attribute);
  }
});

createButtons();
