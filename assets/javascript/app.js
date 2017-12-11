topics = ["Steve Brule", "Tim Heidecker", "John McClane", "Steven Seagal"]
apiKey = "qYmmDFMw3mOgVlSGk0nk2SgV8aFWyAna";

// Takes an array of strings and display them as buttons
function showTopicButtons(topics) {
    // clear buttons-display div
    $("#buttons-display").empty();
    for (let index = 0; index < topics.length; index++) {
        $("#buttons-display").append(`<button class="tag-btn button btn btn-default" data-tag="${topics[index]}">${topics[index]}</button>`);
        
        
        // const element = topics[index];
        
    }
    $(".tag-btn").on("click", function () {
        // 
        tagText = $(this).attr("data-tag");
        $(".tag-btn").removeClass("btn-success").addClass("btn-default");
        $(this).removeClass("btn-default").addClass("btn-success");

        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tagText + "&limit=10" + "&api_key=" + apiKey;

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
                    $("#gifs-display").append(`
                    <div class="thumbnail gif-thumbnail animated zoomIn">
                        <img src="${element.images.fixed_height_downsampled.url}" alt="...">
                        <div class="caption">
                            <h3>Rating: ${element.rating}</h3>
                        </div>
                    </div>`);
                });
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