// JavaScript source code

let numberOfFilms;

do {
    numberOfFilms = prompt('How much movies did you watch?', '');
} while (numberOfFilms === null || numberOfFilms <= 0 || isNaN(numberOfFilms));


const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    privat: false
};

for (let i = 0; i < numberOfFilms; i++) {
    let lastWatchedMovie = prompt('Input one of the last film you watched?', '');
    let movieRating = prompt('How much would you rate it?', '');

    if (lastWatchedMovie === null || movieRating === null ||
        lastWatchedMovie === '' || movieRating === '' ||
        lastWatchedMovie.length > 50) {
        alert('Input error. Please, repeat the action.');
        i--; 
    } else {
        personalMovieDB.movies[lastWatchedMovie.trim()] = movieRating.trim();
    }
}

function movieTable() {
    const tableM = document.getElementById("movieTable");
    let tableHTML = "<table><tr><th>Name of the film</th><th>Score</th></tr>";
    for (let movie in personalMovieDB.movies) {
        tableHTML += `<tr><td>${movie}</td><td>${personalMovieDB.movies[movie]}</td></tr>`;
    }

    tableHTML += '</table>';
    tableM.innerHTML = tableHTML
}


console.log(personalMovieDB);

if (!personalMovieDB.privat) {
    movieTable();
}

