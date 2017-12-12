topics = ["Tim Heidecker", "Eric Wareheim", "Steve Brule", "Tairy Green", "Spagett"]
apiKey = "qYmmDFMw3mOgVlSGk0nk2SgV8aFWyAna";

// Takes an array of strings and display them as buttons
function showTopicButtons(topics) {
    var selectedButton = $(".btn-success").attr("data-tag");
    // clear buttons-display div
    $("#buttons-display").empty();
    for (let index = 0; index < topics.length; index++) {
        
        if (topics[index] === selectedButton) {
            $("#buttons-display").append(`<button class="tag-btn button btn btn-success" data-tag="${topics[index]}">${topics[index]}</button>`);
        }
        else {
            $("#buttons-display").append(`<button class="tag-btn button btn btn-default" data-tag="${topics[index]}">${topics[index]}</button>`);
        }
        // const element = topics[index];
        
    }
    $(".tag-btn").on("click", function () {
        // 
        tagText = $(this).attr("data-tag");
        $(".tag-btn").removeClass("btn-success").addClass("btn-default");
        $(this).removeClass("btn-default").addClass("btn-success");

        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tagText + "&limit=10" + "&rating=r" + "&api_key=" + apiKey;

        // call api and display gifs
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the API
            .done(function (response) {
                // Storing an array of results in the results variable
                var results = response.data;
                console.log(response);

                $("#gifs-display").empty();
                // Looping over every result item
                results.forEach(element => {
                    // still image url
                    let stillImgSrc = element.images.fixed_height_still.url;
                    // animated gif url
                    let animatedImgSrc = element.images.fixed_height.url;

                    $("#gifs-display").append(`
                    <div class="thumbnail gif-thumbnail animated zoomIn">
                        <img class="gif-img" data-animated-src="${animatedImgSrc}" data-still-src="${stillImgSrc}" src="${stillImgSrc}" alt="...">
                        <div class="caption">
                            <h3>Rating: ${element.rating}</h3>
                        </div>
                    </div>`);
                    
                });
                // add click handler for gifs
                $(".gif-img").on("click", function() {
                    let stillImgSrc = $(this).attr("data-still-src");
                    let animatedImgSrc = $(this).attr("data-animated-src");
                    let currentSrc = $(this).attr("src");

                    if (currentSrc === stillImgSrc) {
                        $(this).attr("src", animatedImgSrc);
                    }
                    else {
                        $(this).attr("src", stillImgSrc);
                    }
                })
            });
    });
}


$("#new-tag-form").submit(function(event) {
    // prevent default form submission behavior
    event.preventDefault();

    let tagText = $("#new-tag-input").val();

    if (tagText !== "") {
        // add a new button and clear the input box
        console.log("adding tag:", tagText);
        topics.push(tagText);
        showTopicButtons(topics);
    }
    
});



showTopicButtons(topics);

function name(params) {
    
}