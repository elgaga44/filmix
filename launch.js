getMovie();

async function getMovie() {

    loadingScreen.style.display = "Flex";

    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=b8f2293b707b20a0f2b4fe224087f761&language=en-EN&vote_average.gte=7&vote_count.gte=50&with_original_language=fr&page=10')
	.then(async function (response) {
        customFilms = await response.data;
        randomPage = await customFilms.total_pages;
        userAnswers.page = `${Math.floor(Math.random() * randomPage + 1)}`;
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b8f2293b707b20a0f2b4fe224087f761&language=en-EN&vote_average.gte=7&vote_count.gte=50&with_original_language=fr&page=${customFilm.poster_path}`)
        .then(async function (response) {
            return customFilms = await response.data;
        })
        .catch(function (error) {
        // handle error
        console.log("OH NO! SECOND CALL DID NOT WORK", error)
        })
	})
	.catch(function (error) {
	// handle error
	console.log("OH NO!", error)
    })
    .then(async function () {
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

        getFilmDetails();
        
        changeFilm()

        setTimeout(function () {
            loadingScreen.style.display = "None";
            card.style.display = "Flex";
        },500)
        })

}