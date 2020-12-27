const startNow = document.querySelector("#startNow");

const startPage = document.querySelector(".startPage");

startNow.addEventListener("click", function () {

    // Display first question
    startPage.style.opacity = "0%";

    setTimeout(() => {
        questionCard.style.display = "Flex";
        startPage.style.display = "None";
    }, 250);

    // Enable genre selection
    selectGenres();

    
});