var searchForm = document.getElementById("searchForm");
let searchText = document.getElementById("searchText");
let movieSection = document.getElementById("movies");

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
          <a onclick="movieSelected('${movie.imbdID}')" class="btn btn-primary" href="#">Movie Details </a>
          </div>
          </div>
        `;
      }
      console.log(output);
      if (movieSection) {
        movieSection.innerHTML += output;
      }
    })

    .catch(err => {
      console.log(err);
    });
}
