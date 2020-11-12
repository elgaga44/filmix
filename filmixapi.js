// ####################
// DOM variables
// ####################

const change = document.querySelector(".anotherFilm");

let poster = document.querySelector(".posterPic");

let title = document.querySelector(".filmTitle");

let director = document.querySelector(".filmDirector");

let overview = document.querySelector(".filmOverview");

let casting = document.querySelector(".filmCasting");

let score = document.querySelector(".imdbRating");

let background = document.querySelector(".background");

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
    { page: Math.floor(Math.random() * 5) + 1 },
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
// Get random movie details
// #################################

let getDetails = getFilmDetails();
let filmDetails = {};

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
}

function errorCB(data) {
  console.log("Error callback: " + data);
}

// #################################
// Get random movie casting
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

// // #################################
// // Launch
// // #################################

// randomID = random();

// filmCasting = [];

// getTop = getTopFilm();

// getDetails = getFilmDetails();

// getCasting = getFilmCasting();

// #################################
// Change film
// #################################

let newFilm = change.addEventListener("click", changeFilm);

function changeFilm() {
  poster.style.background = `url('https://image.tmdb.org/t/p/w500/${filmDetails.poster_path}') center/cover`;
  title.innerHTML = `${filmDetails.title}`;
  // director.innerHTML = `Director: ${film[randomFilm].director}`;
  overview.innerHTML = `${filmDetails.overview}`;
  casting.innerHTML = `${filmCasting.join(", ")}`;
  score.innerHTML = `${filmDetails.vote_average}/10`;
  background.style.background = `url('https://image.tmdb.org/t/p/w500/${filmDetails.backdrop_path}') center/cover`;

  randomID = random();

  filmCasting = [];

  getTop = getTopFilm();

  getDetails = getFilmDetails();

  getCasting = getFilmCasting();
}
