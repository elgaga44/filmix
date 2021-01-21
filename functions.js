// #################################
// MAIN FEATURE: CHANGE FILM
// #################################

// Change film when clicking on the "Change" button

change.addEventListener("click", function (){
    getFilm();
});

// Change film when pressing the space bar

window.addEventListener("keydown", function (e) {
    if (background.style.background !== "") {
        switch (e.code) {
            case "Space":
              getFilm();
          } 
    }
});

// ####################################
// MAIN FUNCTION: GET CUSTOM FILM
// ####################################

async function getFilm() {

    await discoverQuery(userAnswers, "discover", "movie", "english");

    customFilm = await customFilms.results[Math.floor(Math.random() * customFilms.results.length)];
    customFilmTitle = await customFilm.title;
    customFilmLanguage = await customFilm.original_language.toUpperCase();
    customFilmOverview = await customFilm.overview;
    customFilmID = await customFilm.id;
    customFilmVoteAverage = await customFilm.vote_average;
    customFilmReleaseDate = await customFilm.release_date.slice(0,4);
    customFilmPoster = `url('https://image.tmdb.org/t/p/w500/${customFilm.poster_path}') center/cover`;
    customFilmBackdrop = `url('https://image.tmdb.org/t/p/w500/${customFilm.backdrop_path}') center/cover`;
    customFilmGenres = [];
    customFilmRuntime = "";
    customFilmActors = [];
    customFilmDirector = "";
    customFilmTrailer = "";

    await filmDetailsQuery("movie", "details", "english");
    await filmCastQuery("movie", "credits", "english");
    await filmTrailerQuery("movie", "videos", "english");
    await filmProvidersQuery("movie", "providers", "english");

    await getFilmDetails();
    
    changeFilm(); 
}
  
// #################################
// MAIN FUNCTION: POPULATE FILM PAGE
// #################################

function changeFilm() {
    // // Remove right card and make it appear again
    right.classList.toggle("opaciter");
    
    setTimeout(() => {

        // Remove previous films rent availability
        document.querySelectorAll('.rent').forEach(e => e.remove());
        document.querySelectorAll('.unavailableRent').forEach(e => e.remove());

        // Remove previous films streaming availability
        document.querySelectorAll('.svod').forEach(e => e.remove());
        document.querySelectorAll('.unavailableStream').forEach(e => e.remove());

        // ADD MAIN FILM DETAILS
        poster.style.background = customFilmPoster;
        trailer.href = `https://www.youtube.com/watch?v=${customFilmTrailer}`;
        ytTrailer.src = `https://www.youtube.com/embed/${customFilmTrailer}`;
        totalResults.innerHTML = customFilms.total_results;
        title.innerHTML = customFilmTitle;
        date.innerHTML = customFilmReleaseDate;
        genre.innerHTML = `${customFilmGenres.join(", ")}`;
        duration.innerHTML = customFilmRuntime;
        language.innerHTML = customFilmLanguage;
        director.innerHTML = `  ${customFilmDirector}`;
        overview.innerHTML = customFilm.overview;
        casting.innerHTML = `  ${customFilmActors.join(", ")}`;

        // ADD FILM RATING
        ratingBadge.innerHTML = `${customFilmVoteAverage}`;
        if (customFilmVoteAverage < 6.5) {
            ratingBadge.style.background = "orange";
        } 
        if (customFilmVoteAverage < 5) {
            ratingBadge.style.background = "red";
        } 
        
        if (customFilmVoteAverage >= 6.5) {
            ratingBadge.style.background = "#66c566";
        }
        ratingBadge.classList.add("spin");

        // ADD FILM BACKGROUND
        if (customFilmBackdrop !== "url('https://image.tmdb.org/t/p/w500/null') center/cover") {
            background.style.background = customFilmBackdrop;
        } else {
            background.style.background = customFilmPoster;
        }
        background.style.filter = "blur(20px) brightness(30%)";

        // ADD STREAMING AVAILABILITY
        if (customFilmProviders.results.FR === undefined) {
            pStream.classList.add("unavailableStream")
            pStream.innerText = "Currently unavailable on streaming services.";
            streamNow.appendChild(pStream);
        } else {
            if (customFilmProviders.results.FR.flatrate === undefined) {
                pStream.classList.add("unavailableStream")
                pStream.innerText = "Currently unavailable on streaming services.";
                streamNow.appendChild(pStream);
            } else {
                for (let index = 0; index < customFilmProviders.results.FR.flatrate.length; index++) {
                    const a = document.createElement("a");
                    a.href= customFilmProviders.results.FR.link
                    a.target = "_blank"
                    a.innerHTML = `<img src=https://image.tmdb.org/t/p/w500${customFilmProviders.results.FR.flatrate[index].logo_path} class="svod">`
                    streamNow.appendChild(a);
                }
            }
        }

        // ADD RENT AVAILABILITY
        if (customFilmProviders.results.FR === undefined) {
            pRent.classList.add("unavailableRent")
            pRent.innerText = "Currently unavailable on rental services.";
            rentNow.appendChild(pRent);
        } else {
            if (customFilmProviders.results.FR.rent === undefined) {
                pRent.classList.add("unavailableRent")
                pRent.innerText = "Currently unavailable on rental services.";
                rentNow.appendChild(pRent);
            } else {
                for (let index = 0; index < 4; index++) {
                    const a = document.createElement("a");
                    a.href = customFilmProviders.results.FR.link
                    a.target = "_blank"
                    a.innerHTML = `<img src=https://image.tmdb.org/t/p/w500${customFilmProviders.results.FR.rent[index].logo_path} class="rent">`
                    rentNow.appendChild(a);
                }
            }
        }
    }, 250);

    setTimeout(() => {
        right.classList.toggle("opaciter");
    }, 500);

    setTimeout(() => {
        ratingBadge.classList.remove("spin");
    }, 1000);
}

// ########################################################################
// FUNCTION: GET FILM GENRES, RUNTIME, CASTING, DIRECTOR, TRAILER, PROVIDERS
// #######################################################################

function getFilmDetails() {
    // Get runtime
    customFilmRuntime = `${filmDetails.runtime} min`;
    // Get 2 genres
    if (filmDetails.genres.length > 1) {
        for (let index = 0; index < 2; index++) {
            customFilmGenres.push(filmDetails.genres[index].name);
          };
    } else {
        for (let index = 0; index < 1; index++) {
            customFilmGenres.push(filmDetails.genres[index].name);
          };
    }
    // Rename "Science-Fiction" to "SF"
    for (let index = 0; index < customFilmGenres.length; index++) {
        if (customFilmGenres[index] == "Science Fiction") {
            customFilmGenres[index] = "SF";
        }  
    }
    // Get first 3 actors
    if (customFilmCasting.cast.length > 2) {
        for (let index = 0; index < 3; index++) {
            customFilmActors.push(customFilmCasting.cast[index].name);
          }
    } else {
        for (let index = 0; index < customFilmCasting.cast.length; index++) {
            customFilmActors.push(customFilmCasting.cast[index].name);
          }
    }
    // Get film Director
    for (let index = 0; index < customFilmCasting.crew.length; index++) {
        if (customFilmCasting.crew[index].job == "Director") {
        customFilmDirector = customFilmCasting.crew[index].name;
        }
    }
    // Get film trailer
    for (let index = 0; index < customFilmAllVideos.results.length; index++) {
        if (customFilmAllVideos.results[index].type == "Trailer") {
            customFilmTrailer = customFilmAllVideos.results[index].key;
        }
    }
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
  