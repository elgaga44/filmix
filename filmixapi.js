// ####################
// DOM variables
// ####################

const change = document.querySelector(".anotherFilm");

let poster = document.querySelector(".posterPic");

let trailer = document.querySelector(".filmTrailer");

let title = document.querySelector(".filmTitle");

let date = document.querySelector(".filmDate");

let genre = document.querySelector(".filmGenre");

let duration = document.querySelector(".filmLength");

let director = document.querySelector(".filmDirector");

let overview = document.querySelector(".filmOverview");

let casting = document.querySelector(".filmCasting");

let score = document.querySelector(".imdbRating");

let background = document.querySelector(".background");

let body = document.querySelector("body");

let right = document.querySelector(".right");

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
    { page: Math.floor(Math.random() * 20) + 1 },
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
  // Activate right part
  right.style.display = "flex";

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
