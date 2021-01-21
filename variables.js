// ################################################
// General DOM VARIABLES
// ################################################

const h1 = document.querySelector("H1");

const background = document.querySelector(".background");

const body = document.querySelector("body");

// ################################################
// Questions DOM VARIABLES
// ################################################

const answers = document.getElementById("answers");

const answerGenre = document.querySelectorAll(".answerGenre");

const answerLanguage = document.querySelectorAll(".answerLanguage");

const answerEra = document.querySelectorAll(".answerEra");

const answerRating = document.querySelectorAll(".answerRating");

const tick = document.querySelectorAll(".tick");

const answerSelected = document.getElementsByClassName("answerSelected");

const gotoLanguage = document.getElementById("gotoLanguage");

const gotoEra = document.getElementById("gotoEra");

const gotoRating = document.getElementById("gotoRating");

const gotoResult = document.getElementById("gotoResult");

const questionCard = document.querySelector(".questionCard");

const questionCardLanguage = document.querySelector(".questionCardLanguage");

const questionCardEra = document.querySelector(".questionCardEra");

const questionCardRating = document.querySelector(".questionCardRating");

const loadingScreen = document.querySelector(".loadingScreen");

const bulb = document.querySelector(".bulb");

// ####################
// Film page DOM variables
// ####################

const card = document.querySelector(".card");

const totalResults = document.querySelector(".totalResults");

const change = document.querySelector(".anotherFilm");

const poster = document.querySelector(".posterPic");

const ratingBadge = document.querySelector(".ratingBadge");

const trailer = document.querySelector(".filmTrailer");

const ytTrailer = document.querySelector(".ytTrailer");

const title = document.querySelector(".filmTitle");

const date = document.querySelector(".filmDate");

const genre = document.querySelector(".filmGenre");

const duration = document.querySelector(".filmLength");

const language = document.querySelector(".filmLanguage");

const director = document.querySelector(".filmDirector");

const overview = document.querySelector(".filmOverview");

const casting = document.querySelector(".filmCasting");

const score = document.querySelector(".imdbRating");

const filmRenting = document.querySelector("#rentNow");

const filmStreaming = document.querySelector("#streamNow");

const right = document.querySelector(".right");

const details = document.querySelectorAll(".details");

const svod = document.querySelectorAll(".svod");

// const a = document.createElement("a");

const imgRent = document.createElement("img");

const imgStream = document.createElement("img");

const pRent = document.createElement("p");

const pStream = document.createElement("p");


// ######################
// User answers variable
// ######################

let userAnswers = {
    with_genres: [],
    "release_date.lte": [],
    "release_date.gte": [],
    "vote_average.lte": [],
    "vote_average.gte": [],
    "vote_count.gte": 50,
    "with_original_language": [],
    "page": 1,
}