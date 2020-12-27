// ################################################
// VARIABLES
// ################################################

let h1 = document.querySelector("H1");

let answers = document.getElementById("answers");

let answerGenre = document.querySelectorAll(".answerGenre");

let answerEra = document.querySelectorAll(".answerEra");

let answerRating = document.querySelectorAll(".answerRating");

let tick = document.querySelectorAll(".tick");

let answerSelected = document.getElementsByClassName("answerSelected");

let gotoEra = document.getElementById("gotoEra");

let gotoRating = document.getElementById("gotoRating");

let gotoResult = document.getElementById("gotoResult");

let questionCard = document.querySelector(".questionCard");

let questionCard2 = document.querySelector(".questionCard2");

let questionCard3 = document.querySelector(".questionCard3");

let loadingScreen = document.querySelector(".loadingScreen");

let card = document.querySelector(".card");

let userAnswers = {
    with_genres: [],
    "release_date.lte": [],
    "release_date.gte": [],
    "vote_average.lte": [],
    "vote_average.gte": [],
    "vote_count.gte": 50,
    "page": []
}


// ##############
// Genre question
// ##############

gotoEra.addEventListener("click", function () {
    if (answerSelected.length !== 0) {
        // Add selected genres to user choice
        for (let index = 0; index < answerSelected.length; index++) {
            userAnswers.with_genres.push(answerSelected[index].id);
        };
        // Ask era question
        questionCard.style.opacity = "0%";
        setTimeout(() => {
            questionCard2.style.display = "Flex";
            questionCard.style.display = "None";
        }, 250);

        // Reset selected answers
        for (let index = 0; index < answerGenre.length; index++) {
            answerGenre[index].classList.remove("answerSelected");  
        }
        selectEra();
    } else {
        alert("Choose at least one answer!");
    }
});

// ##############
// Era question
// ##############

gotoRating.addEventListener("click", function () {
    // Add selected eras to user choice
    for (let index = 0; index < answerSelected.length; index++) {
        if (answerSelected[index].id === "1960"|| answerSelected[index].id === "1999") {
            userAnswers["release_date.lte"].push(`${answerSelected[index].id}-12-31`);
        } 
        if (answerSelected[index].id === "2000") {
            userAnswers["release_date.gte"].push(`${answerSelected[index].id}-01-01`);
        }
    };

    // Ask rating question
    questionCard2.style.opacity = "0%";
    setTimeout(() => {
        questionCard2.style.display = "None";
        questionCard3.style.display = "Flex";
    }, 250);

    // Reset selected answers
    for (let index = 0; index < answerEra.length; index++) {
        answerEra[index].classList.remove("answerSelected");  
    }

    selectRating ()
});

// ##############
// Rating question
// ##############

gotoResult.addEventListener("click", function () {
    if (answerSelected.length !== 0) {
        // Add selected eras to user choice
        for (let index = 0; index < answerSelected.length; index++) {
            if (answerSelected[index].id === "7.5"|| answerSelected[index].id === "6") {
                userAnswers["vote_average.gte"].push(answerSelected[index].id);
            }
            if (answerSelected[index].id === "5") {
                userAnswers["vote_average.lte"].push(answerSelected[index].id);
                userAnswers.page = 1;
            }
        };


        // Load film
            questionCard3.style.opacity = "0%";
        setTimeout(function () {
            questionCard3.style.display = "None";
            loadingScreen.style.display = "Flex";
            background.style.opacity = "0%";
            // Get film page
            getFilmPage();

            // Get films
            getFilm();
        },250)
        

        setTimeout(function () {
            loadingScreen.style.display = "None";
            background.style.opacity = "100%";
            card.style.display = "Flex";
        },2000)


        // Reset selected answers
        for (let index = 0; index < answerRating.length; index++) {
            answerRating[index].classList.remove("answerSelected");  
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
            if (answerSelected.length < 2) {
                answer.classList.toggle("answerSelected");
                answer.firstElementChild.classList.toggle("tickOn");
            } else {
                answer.classList.remove("answerSelected");
                answer.firstElementChild.classList.remove("tickOn");
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