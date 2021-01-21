// ################################################
// VARIABLES
// ################################################

const startNow = document.querySelector("#startNow");

const startPage = document.querySelector(".startPage");

const menuPage = document.querySelector(".brand");

// ######################
// Start page at launch
// ######################

startNow.addEventListener("click", function () {

    // Display first question
    startPage.style.opacity = "0%";

    setTimeout(() => {
        questionCard.style.display = "Flex";
        questionCard.style.opacity = "100%";
        startPage.style.display = "None";
    }, 250);

    // Enable genre selection
    selectGenres();
});

// ######################
// Relaunch start page
// ######################

menuPage.addEventListener("click", function () {

    // Reset user answers
    userAnswers = {
        with_genres: [],
        "release_date.lte": [],
        "release_date.gte": [],
        "vote_average.lte": [],
        "vote_average.gte": [],
        "vote_count.gte": 50,
        "with_original_language": [],
        "page": []
    }

    // Display start page
    background.style.background = "#202231";
    background.style.filter = "None";
    questionCard.style.opacity = "0%";
    questionCardLanguage.style.opacity = "0%";
    questionCardEra.style.opacity = "0%";
    questionCardRating.style.opacity = "0%";
    card.style.opacity = "0%";


    setTimeout(() => {
        questionCard.style.display = "Flex";
        questionCard.style.opacity = "100%";
        questionCardEra.style.display = "None";
        questionCardRating.style.display = "None";
        card.style.display = "None";
    }, 250);

});
