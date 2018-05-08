$(document).ready(function(){

//GLOBAL VARIABLES
//=============================================================
//Array of gifs here
var gifList = ["Rick and Morty", "Futurama", "South Park", "Beavis and Butthead", "Daria", "The Simpsons", "Ren and Stimpy", "Family Guy"];

//FUNCTIONS
//======================================================
function displayGif()
{
    //Empty previous 10 divs before adding 10 more..
    $("#gifs").empty();
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=AMEh4BzCNmxQIQdfRl5K60PbvU7r4QFn&limit=10";
    //Make AJAX call to Giphy API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var results = response.data
        console.log(results)
        //Run for loop on all 10 responses
        for(var i = 0; i < results.length; i++)
        {
            //Give each gif a div
            var gifDiv = $("<div>")
            //Add class to gifDiv
            gifDiv.addClass("gifItem")
            //Create variable for the rating
            var rating = results[i].rating;
            //Create paragraph with item's rating
            var ratingText = $("<p>").text("Rating: " + rating);
            //Create image tag
            var gifImage = $("<img>");
            //Give image tag src to show image
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            //Give gif data-still attribute
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");
            gifImage.addClass("gifImage");
            //Append ratingText and gifImage to gifDiv
            gifDiv.append(gifImage);
            gifDiv.append(ratingText);
            //Append gifDiv to html
            $("#gifs").prepend(gifDiv);
        }
        //Create div to hold all gif info we need
        var gifDiv = $("<div>");
        //Give gifDiv class
        gifDiv.addClass("gifs");
        
    })

}
function createButtons()
{
    //Empty out buttons so it doesn't repeat
    $("#gifButtons").empty();
    //Create button for each item in array
    for (var i = 0; i < gifList.length; i++)
    {
        //Create button with jQuery
        var button = $("<button>");
        //Give buttons class
        button.addClass("gifButton");
        //Give buttons data attribute
        button.attr("data-name", gifList[i]);
        //Give buttons text
        button.text(gifList[i]);
        //Append buttons to html
        $("#gifButtons").append(button);
    }
}
//ON CLICK EVENT FUNCTIONS
//======================================================
//On click function on buttons that will add new button
$("#addGif").on("click", function(event)
{
    event.preventDefault();
    //Grab input from html
    var gif = $("#gifInput").val();
    //Add cartoon to gifArray
    gifList.push(gif);
    //Call createButtons function to update new button
    createButtons();
})

$("body").on("click", ".gifImage", function(){
    //Make variable to see if images is still or animated
    var state = $(this).attr("data-state");
    //Change img src to animate version if it is still
    if(state === "still")
    {
        $(this).attr("src", $(this).attr("data-animate"));
        //Change data-state of gif to animate
        $(this).attr("data-state", "animate");
    }
    //Changes animate state back to still
    else
    {
        $(this).attr("src", $(this).attr("data-still"));
        //Change data-state of gif to still
        $(this).attr("data-state", "still");
    }
})

$(document).on("click", ".gifButton", displayGif);

createButtons();
})