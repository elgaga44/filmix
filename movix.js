// ####################
// Movies Database
// ####################

let movies = [
  {
    title: "Blade Runner 2049",
    director: "Denis Villeneuve",
    year: 2020,
    overview:
      "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard, a former LAPD blade runner who has been missing for 30 years.",
    casting:
      "Ryan Gosling, Dave Bautista, Robin Wright, Ana de Armas, Jared Leto, Harrisson Ford",
    score: 8,
    streaming: ["None"],
    poster: "poster2.jpeg",
  },
  {
    title: "Blade Runner",
    director: "Ridley Scott",
    year: 1982,
    overview:
      "In the smog-choked dystopian Los Angeles of 2019, blade runner Rick Deckard is called out of retirement to terminate a quartet of replicants who have escaped to Earth seeking their creator for a way to extend their short life spans.",
    casting: "Harrisson Ford, Rutger Hauer, Sean Young, Edward James Olmos",
    score: 8.1,
    streaming: ["Netflix"],
    poster: "poster-bladerunner.jpg",
  },
  {
    title: "Star Wars",
    director: "George Lucas",
    year: 1977,
    overview:
      "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
    casting:
      "Harrisson Ford, Mark Hamill, Carrie Fisher, Peter Cushing, Alec Guinness",
    score: 8.2,
    streaming: ["Disney"],
    poster: "poster-starwars.jpg",
  },
];

// ####################
// Movies variables
// ####################

let randomFilm = random();

function random() {
  return Math.floor(Math.random() * movies.length);
}

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

let body = document.querySelector("body");

// ####################
// Change film
// ####################

let newFilm = change.addEventListener("click", changeFilm);

function changeFilm() {
  // poster.src = `${movies[randomFilm].poster}`;
  poster.style.background = `url('${movies[randomFilm].poster}') center/cover`;
  title.innerHTML = `${movies[randomFilm].title}`;
  director.innerHTML = `Director: ${movies[randomFilm].director}`;
  overview.innerHTML = `${movies[randomFilm].overview}`;
  casting.innerHTML = `${movies[randomFilm].casting}`;
  score.innerHTML = `${movies[randomFilm].score}/10`;
  body.style.background = `url('${movies[randomFilm].poster}')`;
  body.style.backgroundPosition = "center";
  randomFilm = random();
}

// function changeFilm() {
//   poster.src = "poster-bladerunner.jpg";
//   title.innerHTML = "Blade Runner";
// }

// let goodMovies = movies.filter((m) => m.score > 6);
// let badMovies = movies.filter((m) => m.score < 6);
