// ####################
// DOM variables
// ####################

const change = document.querySelector(".anotherFilm");

const poster = document.querySelector(".posterPic");

const trailer = document.querySelector(".filmTrailer");

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

const card = document.querySelector(".card");

const bulb = document.querySelector(".bulb");

const details = document.querySelectorAll(".details");

const menu = document.querySelector(".menu");



// #################################
// Activate/Desactivate Light Mode
// #################################

bulb.addEventListener("click", function () {
  console.log("Prout");
  card.classList.toggle("card-white");
  trailer.classList.toggle("filmTrailer-white");
  background.classList.toggle("background-white");
  menu.classList.toggle("menu-white");
  bulb.classList.toggle("bulb-white");
  for (let detail of details) {
    detail.classList.toggle("details-white");
  }
});


// #################################
// Desactivating Scroll with spacebar
// #################################

window.addEventListener("keydown", function (e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

// #################################
// Get random ID
// #################################

let randomID = random();

function random() {
  return Math.floor(Math.random() * 20);
}

// #####################################
// Get top films & random movie in it
// #####################################

let getTop = getTopFilm();
let topFilms = {};
let randomMovie = "";

// with

function getTopFilm() {
  theMovieDb.movies.getTopRated(
    { page: Math.floor(Math.random() * 50) + 1 },
    successCBTop,
    errorCBTop
  );
}

function successCBTop(data) {
  topFilms = JSON.parse(data);
  randomMovie = topFilms.results[randomID].id;
}

function errorCBTop(data) {
  console.log("Error callback: " + data);
}

// #################################
// Get this movie details
// #################################

let getDetails = getFilmDetails();
let filmDetails = {};
let filmGenres = [];

// with

function getFilmDetails() {
  if (randomMovie === "") {
    theMovieDb.movies.getById({ id: 11 }, successCB, errorCB);
  } else {
    theMovieDb.movies.getById({ id: randomMovie }, successCB, errorCB);
  }
}

function successCB(data) {
  console.log(data);
  filmDetails = JSON.parse(data);
  for (let index = 0; index < 2; index++) {
    filmGenres.push(filmDetails.genres[index].name);
  }
}

function errorCB(data) {
  console.log("Error callback: " + data);
}

// Get this movie overview

function movieSynopsis() {
  if (filmDetails.overview.length > 300) {
    return `${filmDetails.overview.slice(0, 300)} [...]`;
  } else {
    return `${filmDetails.overview}`;
  }
}

// Get this movie title

function movieTitle() {
  if (filmDetails.title.length > 25) {
    title.style.fontSize = "35px";
    return filmDetails.title;
  } else {
    title.style.fontSize = "40px";
    return filmDetails.title;
  }
}

// #################################
// Get this movie trailer
// #################################

let getTrailer = getFilmTrailer();
let allVideos = {};
let filmTrailer = "";

function getFilmTrailer() {
  if (randomMovie === "") {
    theMovieDb.movies.getVideos({ id: 11 }, successCBTrailer, errorCBTrailer);
  } else {
    theMovieDb.movies.getVideos(
      { id: randomMovie },
      successCBTrailer,
      errorCBTrailer
    );
  }
}

function successCBTrailer(data) {
  allVideos = JSON.parse(data);
  for (let index = 0; index < allVideos.results.length; index++) {
    if (allVideos.results[index].type == "Trailer") {
      filmTrailer = allVideos.results[index].key;
    }
  }
}

function errorCBTrailer(data) {
  console.log("Error callback: " + data);
}

// #################################
// Get this movie casting
// #################################

let getCasting = getFilmCasting();
let wholeCasting = {};
let filmCasting = [];

// with

function getFilmCasting() {
  if (randomMovie === "") {
    theMovieDb.movies.getCredits({ id: 11 }, successCBCasting, errorCBCasting);
  } else {
    theMovieDb.movies.getCredits(
      { id: randomMovie },
      successCBCasting,
      errorCBCasting
    );
  }
}

function successCBCasting(data) {
  wholeCasting = JSON.parse(data);
  for (let index = 0; index < 5; index++) {
    filmCasting.push(wholeCasting.cast[index].name);
  }
}

function errorCBCasting(data) {
  console.log("Error callback: " + data);
}

// #################################
// Get this movie director
// #################################

function movieDirector() {
  if (wholeCasting == {}) {
    return (filmDirector = "George Lucas");
  } else {
    for (let index = 0; index < wholeCasting.crew.length; index++) {
      if (wholeCasting.crew[index].job == "Director") {
        return wholeCasting.crew[index].name;
      }
    }
  }
}

// #################################
// Launch page
// #################################

window.addEventListener("load", startFilm);

// With...

function startFilm() {
  //   // Add new film
  //   poster.style.background = `url('https://image.tmdb.org/t/p/w500/${filmDetails.poster_path}') center/cover`;

  //   trailer.href = `https://www.youtube.com/watch?v=${filmTrailer}`;

  //   title.innerHTML = `${movieTitle()}`;

  //   date.innerHTML = `${filmDetails.release_date.slice(0, 4)}`;

  //   genre.innerHTML = `${filmGenres.join(", ")}`;

  //   duration.innerHTML = `${filmDetails.runtime} min`;

  //   director.innerHTML = `Director: ${movieDirector()}`;

  //   overview.innerHTML = `${movieSynopsis()}`;

  //   casting.innerHTML = `${filmCasting.join(", ")}`;

  //   score.innerHTML = `${filmDetails.vote_average}/10`;

  //   background.style.background = `url('https://image.tmdb.org/t/p/w500/${filmDetails.backdrop_path}') center/cover`;

  //   Preload first film
  randomID = random();

  filmCasting = [];

  filmGenres = [];

  getTop = getTopFilm();

  getDetails = getFilmDetails();

  getCasting = getFilmCasting();

  getDirector = movieDirector();

  getTrailer = getFilmTrailer();
}

// #################################
// Change film
// #################################

change.addEventListener("click", changeFilm);

window.addEventListener("keydown", function (e) {
  switch (e.code) {
    case "Space":
      changeFilm();
  }
});

// With...

function changeFilm() {
  // Add new film
  poster.style.background = `url('https://image.tmdb.org/t/p/w500/${filmDetails.poster_path}') center/cover`;

  trailer.href = `https://www.youtube.com/watch?v=${filmTrailer}`;

  title.innerHTML = `${movieTitle()}`;

  date.innerHTML = `${filmDetails.release_date.slice(0, 4)}`;

  genre.innerHTML = `${filmGenres.join(", ")}`;

  duration.innerHTML = `${filmDetails.runtime} min`;

  director.innerHTML = `Director: ${movieDirector()}`;

  overview.innerHTML = `${movieSynopsis()}`;

  casting.innerHTML = `${filmCasting.join(", ")}`;

  score.innerHTML = `${filmDetails.vote_average}/10`;

  background.style.background = `url('https://image.tmdb.org/t/p/w500/${filmDetails.backdrop_path}') center/cover`;

  //   Reset everything
  randomID = random();

  filmCasting = [];

  filmGenres = [];

  getTop = getTopFilm();

  getDetails = getFilmDetails();

  getCasting = getFilmCasting();

  getDirector = movieDirector();

  getTrailer = getFilmTrailer();
}
