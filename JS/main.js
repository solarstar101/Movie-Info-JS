var searchForm = document.getElementById("searchForm");
let searchText = document.getElementById("searchText");

searchForm.addEventListener("submit", e => {
  let searchInput = searchText.value;
  getMovies(searchInput);
  e.preventDefault();
});

//fetching movies using axios
function getMovies(searchInput) {
  axios
    .get("http://api.rest7.com/v1/movie_info?imdb=" + searchInput)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}
