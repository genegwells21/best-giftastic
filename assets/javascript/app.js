$(document).ready(function() {
var authors = [
    "Jack Canfield", "Brian Tracy", "Mark Victor Hansen", "John Maxwell", "Bob Proctor", "John Assaraf", "Napoleon Hill", "W. Clement Stone", "Philip C. McGraw", "Joe Vitale"
];

var animals = [];
function renderButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
        var best = $("<button>");
        best.addClass(classToAdd);
        best.attr("data-type", arrayToUse[i]);
        best.text(arrayToUse[i]);
        $(areaToAddTo).append(best)
    }

}

$(document).on("click", ".author-button", function()    {
    $("#authors").empty();
    $(".author-button").removeClass("active");
    $(this).addClass("active");
    console.log($(this));
    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=3fUYDplvO0wyeVypUE1IzP88GgmXzD7p&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response)    {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++)   {
                var animalDiv = $("<div class=\"author-item\">");

                var rating = results[i].rating;
      
                var p = $("<p>").text("Rating: " + rating);
      
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                console.log(animated)
                var animalImage = $("<img>");
                animalImage.attr("src", still);
                animalImage.attr("data-still", still);
                animalImage.attr("data-animate", animated);
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");
      
                animalDiv.append(p);
                animalDiv.append(animalImage);
      
                $("#authors").append(animalDiv);
            }
        });
    });

    $(document).on("click", ".author-image", function() {

        var state = $(this).attr("data-state");

        if (state === "still")  {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    $("#add-author").on("click", function(event)    {
        event.preventDefault();
        var newAnimal = $("input").eq(0).val();

        if (newAnimal.length > 2)   {
            authors.push(newAnimal);
        }

        renderButtons(authors, "author-button", "#author-buttons");

    });
                
    renderButtons(authors, "author-button", "#author-buttons");

});



  