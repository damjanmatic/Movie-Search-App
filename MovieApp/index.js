// http://www.omdbapi.com/?i=tt3896198&apikey=48d3af93

const searchBtn = document.querySelector('.search-btn')
const searchInput = document.querySelector('.search')
const mainBody = document.querySelector('.main-wrapper')
const watchlistInner = document.getElementById('watchlist')

let movieArray = []
let setWatchListArray = []

searchBtn.addEventListener('click', search)

mainBody.addEventListener('click', (e) => {
    if (e.target.dataset.id)
        findMovieIndexById(e.target.dataset.id)

})

async function search() {

    const response = await fetch(`http://www.omdbapi.com/?s=${searchInput.value}&plot=short&apikey=48d3af93`)
    const movies = await response.json()
    if (!movies.Error) {
        movieArray = await Promise.all(movies.Search.flatMap(async movie => {

            const res = await fetch(`http://www.omdbapi.com/?t=${movie.Title}&plot=short&apikey=48d3af93`)
            const movieData = await res.json()
            return movieData
        }))
        render()
    } else {
        movieArray = []
        mainBody.innerHTML = `<h2 class="not-found">Unable to find what you are looking for.<br> Please try another search</h2>`
    }
}

function render() {
    let setHtml = ''
    movieArray.filter(m => m.Title).map(movie => {
        setHtml += `
        <div class="movie-wrapper">
        <img src="${movie.Poster}">
        <div class="movie-information-wrapper">
            <div class="movie-titles">
            <h3>${movie.Title}</h3>
            <h5>${movie.imdbRating}</h5>
            </div>
            <h4>${movie.Year}</h4>
            <div class="movie-titles-info" id=${movie.imdbID}>                        
            <p>${movie.Runtime}</p>
            <p>${movie.Genre}</p>
            <button data-id="${movie.imdbID}" class="add">+</button>
            </div>                   
            <p>${movie.Plot}</p>                        
        </div>
    </div>`

    })
    mainBody.innerHTML = setHtml
}

function findMovieIndexById(movieId) {
    setWatchListArray.push(movieArray.find(movie => movie.imdbID == movieId))
    localStorage.setItem('movies', JSON.stringify(setWatchListArray))
}