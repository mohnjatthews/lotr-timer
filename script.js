// Global variables.
let results = [];

// Set user input DOM objects.
const slider = document.querySelector('.slider');
const number_output = document.querySelector('.output');

// Set movie result DOM objects.
const results_section = document.querySelector('#results_section');
const movie_poster_placeholder = document.querySelector('#poster');
const multiple_result = document.querySelector('#first_title');
const movie_result = document.querySelector('#first_title');
const scene_result = document.querySelector('#first_title');

// Initilize the slider number.
number_output.innerHTML = slider.value;
slider.oninput = function () {
    number_output.innerHTML = this.value;
}

// Gets called when the user clicks on the main button.
function main() {
    setPlayMultiple();
    setMovieResult();
    setSceneResult();
    paintResults();
}

// Set the amount of time the user can watch the trilogy.
function setPlayMultiple() {
    results.multi = 0;
    results.multi = Math.floor(slider.value / 683);
}

// Set which movie the user get's up to.
function setMovieResult() {
    let foo = slider.value;

    // If the slider is set to a value larger than all three movies
    if(results.multi > 0) {
        // Get everything down to a single multiple.
        foo = slider.value - (683 * results.multi);
    }

    if (foo < 208) {
        // Fellowship runtime: 208 minutes
        results.movie = 'Fellowship of the Ring';
    } else if ((foo > 431) && (foo < 431)) {
        // Two Towers runtime: 223 minutes
        results.movie = 'Two Towers';
    } else {
        // Return of the King runtime: 252 minutes
        results.movie = 'Return of the King';
    }
}

// Set which scene in the movie the user get's up to. Also sets the scene description.
function setSceneResult() {
    for(let i = 0; i < movie_data.length; i++) {
        if(slider.value < movie_data[i].end_time) {
            results.scene = movie_data[i].scene;
            results.scene_desc = movie_data[i].scene_description;
            break;
        }
    }
}

// Clears the results section, then paints all the results into the tags.
function paintResults() {
    // Clear everything first.
    results_section.innerHTML = '<h3>You go up to...</h3><h1 id="title_tag"></h1><h4>Specifically, <i><span id="scene_tag"></span></i>. That\'s the one where <span id="scene_description_tag"></span>.<span id="multiple_tag"> This was after watching the entire trilogy</span></h4><h2 id="multiple_value_tag"></h2><br><a onclick="resetPage()" class="go-button">Go again?</a>';

    // Set DOM variables.
    const title_tag = document.querySelector('#title_tag');
    const scene_tag = document.querySelector('#scene_tag');
    const scene_description_tag = document.querySelector('#scene_description_tag');
    const multiple_tag = document.querySelector('#multiple_tag');
    const multiple_value_tag = document.querySelector('#multiple_value_tag');

    // Paint title, scene, and description.
    title_tag.innerHTML = results.movie;
    scene_tag.innerHTML = results.scene;
    scene_description_tag.innerHTML = results.scene_desc;

    // If the user can watch the trilogy through multiple times, paint the multiplier.
    if(results.multi > 0) {
        // Show the correct grammar, we're not animals.
        if(results.multi == 1) {
            multiple_value_tag.innerHTML = `once already!`;
        } else {
            multiple_value_tag.innerHTML = `${results.multi} times over!`;
        }
    } else {
        multiple_tag.innerHTML = " But you didn't actually finish the trilogy. Not even once, you big rookie.";
        multiple_value_tag.style.visibility = "hidden";
    }

}

// Returns the page to it's original state, as in what the user sees when they first open up the page.
function resetPage() {
    window.location.reload();
}


// ====================
// DEPRECATED FUNCTIONS

function showMoviePoster(movie) {
    console.log(movie);
    movie_poster_placeholder.src = `images/${movie}.jpg`;
    movie_poster_placeholder.scrollIntoView();
}