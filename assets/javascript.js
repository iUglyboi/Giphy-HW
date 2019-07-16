var animals = ["Cow", "Dog", "Chicken", "Anteater"]

function displayGif() {
    var animals = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + animals + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax ({
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
            gifDiv.prepend(gifImg);
            $('.gifHere').prepend(gifDiv);
        }
    })
};

    $('.gifHere').on("click", function() {
    
    var state = $(this).attr("data-state");
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  function renderButtons(){
      $(".first-buttons").empty();

      for (let i=0; i < animals.length; i++){
          let buttonAdd = $('<button class="button">');
          buttonAdd.addClass("animals");
          buttonAdd.attr("data-name", animals[i]);
          buttonAdd.html(animals[i]);

          $(".first-buttons").append(buttonAdd)
      }
  }
