document.addEventListener("DOMContentLoaded", () => {
  let moviesPerPage = 32; // Number of movies to load per page
  let currentPage = 1; // Current page

  function fetchMovies() {
    const url =
      "https://raw.githubusercontent.com/mabelrosa96/test/main/movies.txt";

    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const movieContainer = document.querySelector(".movie-covers");

        const movies = data
          .split("</div>")
          .filter((movie) => movie.trim().length > 0);

        const start = (currentPage - 1) * moviesPerPage;
        const end = currentPage * moviesPerPage;

        for (let i = start; i < end && i < movies.length; i++) {
          const movie = movies[i] + "</div>";

          const movieElement = document.createElement("div");
          movieElement.innerHTML = movie;
          movieContainer.appendChild(movieElement);
        }

        if (end >= movies.length) {
          // Hide the "Load More" button if all movies are loaded
          document.getElementById("loadMoreButton").style.display = "none";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Load the initial set of movies
  fetchMovies();

  // Event listener for "Load More" button click
  document.getElementById("loadMoreButton").addEventListener("click", () => {
    currentPage++;
    fetchMovies();
  });
});
