
const TMDB = {
    APIKey: "?api_key=b8f2293b707b20a0f2b4fe224087f761",
    timeout: 2000,
    baseURL: "https://api.themoviedb.org/3/",
    imageURL: "https://image.tmdb.org/t/p/",
    languages: {
        english: "&language=en-EN",
        french: "&language=fr-FR"
    },
    methods: {
        discover: "discover/",
        find: "find/",
        details: "",
        credits: "/credits",
        videos: "/videos",
        providers: "/watch/providers"
    },
    categories: {
        movie: "movie",
        tv: "tv"
    },
};

let userQueries = {
    "sort_by": "vote_average.desc",
    "with_genres": [53,35],
    "release_date.lte": 2000,
    "release_date.gte": [],
    "vote_average.lte": [],
    "vote_average.gte": 7,
    "vote_count.gte": 50,
    "with_original_language": [],
    "page": []
}

// ##########################################
// Get random list of films from user answers
// ##########################################

async function discoverQuery(source, method, category, language) {
    // Basic URL
   url = TMDB.baseURL + TMDB.methods[method] + TMDB.categories[category] + TMDB.APIKey + TMDB.languages[language];
    
    // Adding user queries
    for (const option in source) {
        if (source[option] != "" ) {
            url = url + "&" + option + "=" + source[option];  
        }
    }

    // Adding pipes ("|") to enable multiple answers
    url = url.replaceAll(",", "|")

    // Call the Discover API and get data
    axios.get(url)
	.then(async function (response) {
        // Get random page of results
        customFilms = await response.data;
        randomPage = await customFilms.total_pages;
        userAnswers.page = `${Math.floor(Math.random() * randomPage + 1)}`;
        // Get custom film 
        axios.get(url)
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
}


// #################################
// Set random page of film results
// #################################

async function getFilmPage() {
    await discoverQuery(userAnswers, "discover", "movie", "english");
    // Get number of pages of results
   randomPage = await customFilms.total_pages;
   // Add one random page to user answers
   userAnswers.page = `${Math.floor(Math.random() * randomPage + 1)}`;
};

// #################################
// FUNCTION: MOVIES METHODS
// #################################

async function filmDetailsQuery(category, method, language) {
    // Basic URL
   detailsURL = TMDB.baseURL + TMDB.categories[category] + "/" + customFilmID + TMDB.methods[method] + TMDB.APIKey + TMDB.languages[language];

    // Call the Movie Details API and get data
    await fetch(detailsURL)
    .then(response => {
            return response.json()
        })
    .then(data => {
            filmDetails = data;
        })
        .catch(error => {
            console.log("OH NO!", error)
        })
}

async function filmCastQuery(category, method, language) {
    // Basic URL
   castingURL = TMDB.baseURL + TMDB.categories[category] + "/" + customFilmID + TMDB.methods[method] + TMDB.APIKey + TMDB.languages[language];

    // Call the Movie Details API and get data
    await fetch(castingURL)
    .then(response => {
            return response.json()
        })
    .then(data => {
            customFilmCasting = data;
        })
        .catch(error => {
            console.log("OH NO!", error)
        })
}

async function filmTrailerQuery(category, method, language) {
    // Basic URL
   trailerURL = TMDB.baseURL + TMDB.categories[category] + "/" + customFilmID + TMDB.methods[method] + TMDB.APIKey + TMDB.languages[language];

    // Call the Movie Details API and get data
    await fetch(trailerURL)
    .then(response => {
            return response.json()
        })
    .then(data => {
            customFilmAllVideos = data;
        })
        .catch(error => {
            console.log("OH NO!", error)
        })
}

async function filmProvidersQuery(category, method, language) {
    // Basic URL
   providersURL = TMDB.baseURL + TMDB.categories[category] + "/" + customFilmID + TMDB.methods[method] + TMDB.APIKey + TMDB.languages[language];

    // Call the Movie Details API and get data
    await fetch(providersURL)
    .then(response => {
            return response.json()
        })
    .then(data => {
            customFilmProviders = data;
        })
        .catch(error => {
            console.log("OH NO!", error)
        })
}
