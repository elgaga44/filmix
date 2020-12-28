// ################################################
// VARIABLES
// ################################################

let h1 = document.querySelector("H1");

let answers = document.getElementById("answers");

let answerGenre = document.querySelectorAll(".answerGenre");

let answerLanguage = document.querySelectorAll(".answerLanguage");

let answerEra = document.querySelectorAll(".answerEra");

let answerRating = document.querySelectorAll(".answerRating");

let tick = document.querySelectorAll(".tick");

let answerSelected = document.getElementsByClassName("answerSelected");

let gotoLanguage = document.getElementById("gotoLanguage");

let gotoEra = document.getElementById("gotoEra");

let gotoRating = document.getElementById("gotoRating");

let gotoResult = document.getElementById("gotoResult");

let questionCard = document.querySelector(".questionCard");

let questionCardLanguage = document.querySelector(".questionCardLanguage");

let questionCardEra = document.querySelector(".questionCardEra");

let questionCardRating = document.querySelector(".questionCardRating");

let loadingScreen = document.querySelector(".loadingScreen");

let card = document.querySelector(".card");

let totalResults = document.querySelector(".totalResults");

let userAnswers = {
    with_genres: [],
    "release_date.lte": [],
    "release_date.gte": [],
    "vote_average.lte": [],
    "vote_average.gte": [],
    "vote_count.gte": 50,
    "with_original_language": [],
    "page": []
}


// ####################
// Question 1 : Genre
// ####################

gotoLanguage.addEventListener("click", function () {
    if (answerSelected.length !== 0) {
        // Add selected genres to user choice
        for (let index = 0; index < answerSelected.length; index++) {
            userAnswers.with_genres.push(answerSelected[index].id);
        };
        // Ask language question
        questionCard.style.opacity = "0%";
        setTimeout(() => {
            questionCardLanguage.style.display = "Flex";
            questionCardLanguage.style.opacity = "100%";
            questionCard.style.display = "None";
        }, 250);

        // Reset selected answers
        for (let index = 0; index < answerGenre.length; index++) {
            answerGenre[index].classList.remove("answerSelected");
            answerGenre[index].firstElementChild.classList.remove("tickOn");
        }
        selectLanguage();
    } else {
        alert("Choose at least one answer!");
    }
});

// ####################
// Question 2 : Language
// ####################

gotoEra.addEventListener("click", function () {
    // Add selected language to user choice
    for (let index = 0; index < answerSelected.length; index++) {
        userAnswers["with_original_language"].push(`${answerSelected[index].id}`);
    };
    
    
    // Ask era question
    questionCardLanguage.style.opacity = "0%";
    setTimeout(() => {
        questionCardLanguage.style.display = "None";
        questionCardEra.style.display = "Flex";
        questionCardEra.style.opacity = "100%";
    }, 250);

    // Reset selected answers
    for (let index = 0; index < answerEra.length; index++) {
        answerLanguage[index].classList.remove("answerSelected");
        answerLanguage[index].firstElementChild.classList.remove("tickOn");  
    }

    selectEra();
});

// ####################
// Question 3 : Era
// ####################

gotoRating.addEventListener("click", function () {
    // Add selected eras to user choice
    for (let index = 0; index < answerSelected.length; index++) {
        if (answerSelected[index].id === "1970"|| answerSelected[index].id === "1999") {
            userAnswers["release_date.lte"].push(`${answerSelected[index].id}-12-31`);
        } 
        if (answerSelected[index].id === "2000") {
            userAnswers["release_date.gte"].push(`${answerSelected[index].id}-01-01`);
        }
    };

    // Ask rating question
    questionCardEra.style.opacity = "0%";
    setTimeout(() => {
        questionCardEra.style.display = "None";
        questionCardRating.style.display = "Flex";
        questionCardRating.style.opacity = "100%";
    }, 250);

    // Reset selected answers
    for (let index = 0; index < answerEra.length; index++) {
        answerEra[index].classList.remove("answerSelected");
        answerEra[index].firstElementChild.classList.remove("tickOn");  
    }

    selectRating ()
});

// ####################
// Question 4 : Rating
// ####################

gotoResult.addEventListener("click", function () {
    if (answerSelected.length !== 0) {
        // Add selected eras to user choice
        for (let index = 0; index < answerSelected.length; index++) {
            if (answerSelected[index].id === "7"|| answerSelected[index].id === "6") {
                userAnswers["vote_average.gte"].push(answerSelected[index].id);
            }
            if (answerSelected[index].id === "4.9") {
                userAnswers["vote_average.lte"].push(answerSelected[index].id);
                userAnswers.page = 1;
            }
        };

        // Load first film data & remove question card
            questionCardRating.style.opacity = "0%";
        setTimeout(function () {
            questionCardRating.style.display = "None";
            loadingScreen.style.display = "Flex";
            background.style.opacity = "0%";
            // Get film page
            getFilmPage();

            // Get films
            getFilm();
        },250)
        
        // Display first film
        setTimeout(function () {
            loadingScreen.style.display = "None";
            background.style.opacity = "100%";
            card.style.display = "Flex";
            card.style.opacity = "100%";
        },2000)


        // Reset selected answers
        for (let index = 0; index < answerRating.length; index++) {
            answerRating[index].classList.remove("answerSelected");
            answerRating[index].firstElementChild.classList.remove("tickOn");  
        } 
    } else {
        alert("Choose at least one answer!");
    }   
});


// ##############
// FUNCTIONS
// ##############


function selectGenres () { 
    answerGenre.forEach(answer => {
        answer.addEventListener("click", function () {
            if (answerSelected.length < 1) {
                answer.classList.toggle("answerSelected");
                answer.firstElementChild.classList.toggle("tickOn");
            } else {
                for (let index = 0; index < answerGenre.length; index++) {
                    answerGenre[index].classList.remove("answerSelected");
                    answerGenre[index].firstElementChild.classList.remove("tickOn");
                }
                answer.classList.toggle("answerSelected");
                answer.firstElementChild.classList.toggle("tickOn");
            }
        });
    });
}

function selectLanguage () { 
    answerLanguage.forEach(answer => {
        answer.addEventListener("click", function () {
            if (answerSelected.length < 1) {
                answer.classList.toggle("answerSelected");
                answer.firstElementChild.classList.toggle("tickOn");
            } else {
                for (let index = 0; index < answerLanguage.length; index++) {
                    answerLanguage[index].classList.remove("answerSelected");
                    answerLanguage[index].firstElementChild.classList.remove("tickOn");  
                }
                answer.classList.toggle("answerSelected");
                answer.firstElementChild.classList.toggle("tickOn");
            }
        });
    });
}

function selectEra () { 
    answerEra.forEach(answer => {
        answer.addEventListener("click", function () {
            if (answerSelected.length < 1) {
                answer.classList.toggle("answerSelected");
                answer.firstElementChild.classList.toggle("tickOn");
            } else {
                for (let index = 0; index < answerEra.length; index++) {
                    answerEra[index].classList.remove("answerSelected");
                    answerEra[index].firstElementChild.classList.remove("tickOn");  
                }
                answer.classList.toggle("answerSelected");
                answer.firstElementChild.classList.toggle("tickOn");
            }
        });
    });
}

function selectRating () { 
    answerRating.forEach(answer => {
        answer.addEventListener("click", function () {
            if (answerSelected.length < 1) {
                answer.classList.toggle("answerSelected");
                answer.firstElementChild.classList.toggle("tickOn");
            } else {
                for (let index = 0; index < answerRating.length; index++) {
                    answerRating[index].classList.remove("answerSelected");
                    answerRating[index].firstElementChild.classList.remove("tickOn");  
                }
                answer.classList.add("answerSelected");
                answer.firstElementChild.classList.toggle("tickOn");
            }
        });
    });
}