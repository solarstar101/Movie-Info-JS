var searchForm = document.getElementById("searchForm");
let searchText = document.getElementById("searchText");
let moviesSection = document.getElementById("movies");
let movieSection = document.getElementById("movie");
searchForm.addEventListener("submit", e => {
  let searchInput = searchText.value;
  getMovies(searchInput);
  e.preventDefault();
});

//fetching movies using axios
function getMovies(searchInput) {
  axios
    .get("http://www.omdbapi.com/?s=" + searchInput + "&apikey=4aaa4f4e")
    .then(res => {
      console.log(res);
      let movies = res.data.Search;
      let output = "";

      for (let movie of movies) {
        output += `
        <div class="col-md-3">
          <div class=well text-center"> 
          <img src="${movie.Poster}">
          <h5> ${movie.Title} </h5>
          <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details </a>
          </div>
          </div>
        `;
      }
      if (moviesSection) {
        moviesSection.innerHTML += output;
      }
    })

    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "Movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");

  axios
    .get("http://www.omdbapi.com/?i=" + movieId + "&apikey=4aaa4f4e")
    .then(res => {
      console.log(res);
      let movie = res.data;

      let output = `
        <div class="row"> 

        <div class ="col-md-4"> 
          <img src="${movie.Poster}" class="thumbnail">
        </div>

        <div class="col-md-8"> 
          <h2>${movie.Title} </h2>
          <ul class="list-group"> 
          <li class="list-group-item" 
         <strong>Genre:</strong> ${movie.Genre}
          </li>
          <li class="list-group-item" 
          <strong>Released:</strong> ${movie.Released}
           </li>
           <li class="list-group-item" 
           <strong>Rated:</strong> ${movie.Rated}
            </li>
            <li class="list-group-item" 
            <strong>IMDB Rating:</strong> ${movie.imdbRating}
             </li>
             <li class="list-group-item" 
             <strong>Director:</strong> ${movie.Director}
              </li>
              <li class="list-group-item" 
              <strong>Writer:</strong> ${movie.Writer}
               </li>
               <li class="list-group-item" 
               <strong>Actors:</strong> ${movie.Actors}
                </li>
          </ul>
        </div>
        </div>
        <div class="row"> 
            <div class="well"> 
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View On iMDB </a>
            <a href="index.html" class="btn btn-default">Back to Search </a>
            </div>
        </div>
      `;
      if (movieSection) {
        movieSection.innerHTML += output;
      }
    })

    .catch(err => {
      console.log(err);
    });
}
