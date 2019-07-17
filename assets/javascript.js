var anime = ["Naruto", "Dragon Ball Z", "Black Clover", "Akira", "Seven Deadly Sins", "Akira", "Attack On Titan", "Hunter x Hunter", "Sword Art Online"]

function displayGif() {
    var anime = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=BOT6JHPBvPmL2PSgLkqXaR5pBQjUO3k9&limit=10";
// ajax call for the API
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) { 
        console.log(response)
        $('.gifHere').empty();
    

        for (let i=0; i < response.data.length; i++){
            var gifDiv     = $('<div class="gifDiv">');
            var rating     = response.data[i].rating;
            var ratingDiv  = $('<p>').html("Rating: " + rating);
            var animated   = response.data[i].images.fixed_height.url;
            var still      = response.data[i].images.fixed_height_still.url;
            var gifImg     = $('<img class="gImage">');
        
            gifImg.attr('src', still);
            gifImg.attr('data-still', still);
            gifImg.attr('data-animate', animated);
            gifImg.attr('data-state', 'still')

            gifDiv.append(ratingDiv);
            //gifDiv.prepend(gifImg);
            $('.gifHere').prepend(gifImg);
        }
    })
};
// pause and animate the gifs from assignment 15
    
$('.gifHere').on("click", ".gImage", function() {
    console.log('this was clicked')
    var state = $(this).attr("data-state");
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
// new button function 
  function renderButtons(){
      $(".first-buttons").empty();

      for (let i=0; i < anime.length; i++){
          let buttonAdd = $('<button class="button">');
          buttonAdd.addClass("anime");
          buttonAdd.attr("data-name", anime[i]);
          buttonAdd.html(anime[i]);
        // adds button to the end of the list of the array for "animals"
          $(".first-buttons").append(buttonAdd)
      }
  };

//   creates a new button when you enter a new value
$('.place-gif').on("click", function(event){
    event.preventDefault();
    var gif = $(".gif-here").val().trim();
    anime.push(gif);
    $(".gif-here").val("");
    renderButtons();
});

// calls new buttons to be created in the animal class
$(document).on("click", ".anime", displayGif);
renderButtons();

