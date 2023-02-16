const watchlistBody = document.querySelector('.watchlistWrapper')
let myWatchList;
let storedWatchListArray = JSON.parse(localStorage.getItem('movies'))
if (storedWatchListArray === null) {
    myWatchList = []
} else {
    myWatchList = storedWatchListArray
}

watchlistBody.innerHTML = renderWatchlist()
watchlistBody.addEventListener('click', (e) => {
    if (e.target.dataset.id)
        removeBtn(e.target.dataset.id)

})

function removeBtn(movieId) {
    const index = myWatchList.findIndex(movie => movie.imdbID == movieId)
    myWatchList.splice(index, 1)

    localStorage.setItem('movies', JSON.stringify(myWatchList))
    watchlistBody.innerHTML = renderWatchlist()
}

function renderWatchlist() {
    let watchlistHtml = ''
    if (myWatchList.length > 0) {
        myWatchList.map(movie => {
            watchlistHtml += `
            <div class="movie-wrapper" id=${movie.imdbID}>
            <img src="${movie.Poster}">
            <div class="movie-information-wrapper">
                <div class="movie-titles">
                <h3>${movie.Title}</h3>
                <h5>${movie.imdbRating}</h5>
                </div>
                <h4>${movie.Year}</h4>
                <div class="movie-titles-info">                        
                <p>${movie.Runtime}</p>
                <p>${movie.Genre}</p>
                <button data-id="${movie.imdbID}" class="add">-</button>
                </div>                   
                <p>${movie.Plot}</p>                        
            </div>
        </div>`
        })
        return watchlistHtml
    } else {
        watchlistHtml = `
        <div class="empty-list">
            <h3>Your list is looking a little empty, lets add some movies...</h3>
            <a href="./index.html"><button class="add">+</button></a>
        </div>`
        return watchlistHtml
    }
}