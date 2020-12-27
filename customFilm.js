// ####################
// DOM variables
// ####################

const change = document.querySelector(".anotherFilm");

const poster = document.querySelector(".posterPic");

const trailer = document.querySelector(".filmTrailer");

const ytTrailer = document.querySelector(".ytTrailer");

const title = document.querySelector(".filmTitle");

const date = document.querySelector(".filmDate");

const genre = document.querySelector(".filmGenre");

const duration = document.querySelector(".filmLength");

const director = document.querySelector(".filmDirector");

const overview = document.querySelector(".filmOverview");

const casting = document.querySelector(".filmCasting");

const score = document.querySelector(".imdbRating");

const background = document.querySelector(".background");

const body = document.querySelector("body");

let right = document.querySelector(".right");

const bulb = document.querySelector(".bulb");

const details = document.querySelectorAll(".details");

const menu = document.querySelector(".menu");

// #################################
// MAIN FEATURE: CHANGE FILM
// #################################

// Change film when clicking on the "Change" button

change.addEventListener("click", function (){
    getFilmPage()
    getFilm();
});

// Change film when pressing the space bar

window.addEventListener("keydown", function (e) {
    switch (e.code) {
      case "Space":
        getFilmPage()
        getFilm();
    }
});


// #################################
// Get random page of film results
// #################################

function getFilmPage() {
    theMovieDb.discover.getMovies(userAnswers, 
        // Success callback
        function (data) {
            // Get number of pages of results
            customFilms = JSON.parse(data);
            randomPage = customFilms.total_pages;
            userAnswers.page = `${Math.floor(Math.random() * randomPage + 1)}`;
        }, 
        // Error callback
        function (data) {
            console.log("Error callback: " + data);
        }
    );
}

// ####################################
// Get custom film from the result page
// ####################################

function getFilm() {
    theMovieDb.discover.getMovies(userAnswers, 
        successCB, 
        errorCB
        );
};

function successCB(data) {
    customFilms = JSON.parse(data);
    customFilm = customFilms.results[Math.floor(Math.random() * customFilms.results.length)];
    customFilmTitle = customFilm.title;
    customFilmOverview = customFilm.overview;
    customFilmID = customFilm.id;
    customFilmVoteAverage = customFilm.vote_average;
    customFilmReleaseDate = customFilm.release_date.slice(0,4);
    customFilmPoster = `url('https://image.tmdb.org/t/p/w500/${customFilm.poster_path}') center/cover`;
    customFilmBackdrop = `url('https://image.tmdb.org/t/p/w500/${customFilm.backdrop_path}') center/cover`;
    customFilmGenres = [];
    customFilmRuntime = "";
    customFilmActors = [];
    customFilmDirector = "";
    customFilmTrailer = "";
    getFilmDetails();
    getFilmTrailer();
    getFilmCasting();
    
    setTimeout(() => {
        changeFilm(); 
    }, 250);
}
  
function errorCB(data) {
    console.log("Error callback: " + data);
}

// #################################
// MAIN FUNCTION: POPULATE FILM PAGE
// #################################

function changeFilm() {
    // // Remove right card and make it appear again
    right.classList.toggle("opaciter");

    setTimeout(() => {
        right.classList.toggle("opaciter");
    }, 500);
    
    setTimeout(() => {
        // Add new film
        poster.style.background = customFilmPoster;

        trailer.href = `https://www.youtube.com/watch?v=${customFilmTrailer}`;

        ytTrailer.src = `https://www.youtube.com/embed/${customFilmTrailer}`;

        title.innerHTML = customFilmTitle;

        date.innerHTML = customFilmReleaseDate;

        genre.innerHTML = `${customFilmGenres.join(", ")}`;

        duration.innerHTML = customFilmRuntime;

        director.innerHTML = `  ${customFilmDirector}`;

        overview.innerHTML = customFilm.overview;

        casting.innerHTML = `  ${customFilmActors.join(", ")}`;

        score.innerHTML = customFilmVoteAverage;

        background.style.background = customFilmBackdrop;

        background.style.filter = "blur(20px) brightness(30%)";
    }, 250);
    
}


// ###########################################
// SECONDARY FUNCTIONS: GET OTHER FILM DETAILS
// ###########################################

// #####################################
// FUNCTION: GET FILM DETAILS
// #####################################

function getFilmDetails() {
    theMovieDb.movies.getById({ id: customFilmID }, 
        // Success callback
        function (data) {
            console.log(data);
            // Get film details
            filmDetails = JSON.parse(data);
            // Get runtime
            customFilmRuntime = `${filmDetails.runtime} min`;
            // Get 2 genres
            for (let index = 0; index < 2; index++) {
              customFilmGenres.push(filmDetails.genres[index].name);
            };

            for (let index = 0; index < customFilmGenres.length; index++) {
                if (customFilmGenres[index] == "Science Fiction") {
                    customFilmGenres[index] = "SF";
                }  
            }
            
        }, 
        // Error callback
        function (data) {
            console.log("Error callback: " + data);
        }
    );
}

// #####################################
// FUNCTION: GET FILM CASTING
// #####################################

function getFilmCasting() {
    theMovieDb.movies.getCredits({ id: customFilmID },
        function (data) {
            // Get whole casting & crew
            customFilmCasting = JSON.parse(data);
            // Get first 5 actors
            for (let index = 0; index < 3; index++) {
              customFilmActors.push(customFilmCasting.cast[index].name);
            }
            // Get film Director
            for (let index = 0; index < customFilmCasting.crew.length; index++) {
                if (customFilmCasting.crew[index].job == "Director") {
                  customFilmDirector = customFilmCasting.crew[index].name;
                }
            }
        },
        function errorCBCasting(data) {
            console.log("Error callback: " + data);
        }
    );    
}

// #####################################
// FUNCTION: GET FILM TRAILER
// #####################################


function getFilmTrailer() {
      theMovieDb.movies.getVideos({ id: customFilmID },
        function (data) {
            customFilmAllVideos = JSON.parse(data);
            for (let index = 0; index < customFilmAllVideos.results.length; index++) {
                if (customFilmAllVideos.results[index].type == "Trailer") {
                    customFilmTrailer = customFilmAllVideos.results[index].key;
                }
            }
        },
        function (data) {
            console.log("Error callback: " + data);
        }
    );
    
}
  
// #####################################
// OTHER FUNCTIONS
// #####################################  
  

// #################################
// Desactivating Scroll with spacebar
// #################################

window.addEventListener("keydown", function (e) {
    if (e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });
  