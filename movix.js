let movies = [
  {
    title: "ADN",
    score: 6,
    year: 2020,
  },
  {
    title: "Cube",
    score: 7,
    year: 1999,
  },
  {
    title: "Peninsula",
    score: 4,
    year: 2020,
  },
];

let goodMovies = movies.filter((m) => m.score > 6);
let badMovies = movies.filter((m) => m.score < 6);
