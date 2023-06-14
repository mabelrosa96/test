// Fetch movie data from the text file
fetch("https://raw.githubusercontent.com/mabelrosa96/test/main/movies.txt")
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    const movieElements = doc.querySelectorAll(".movie-cover");

    const movieCoversSection = document.querySelector(".movie-covers");
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", () => {
      const searchTerm = normalizeString(searchInput.value.toLowerCase());
      movieCoversSection.innerHTML = "";

      movieElements.forEach((movieElement) => {
        const movieTitle = normalizeString(
          movieElement.querySelector("h4").textContent.toLowerCase()
        );

        if (movieTitle.includes(searchTerm)) {
          const movieDiv = document.createElement("div");
          movieDiv.className = "movie-cover";

          const imgElement = movieElement.querySelector("img").cloneNode(true);
          const h4Element = document.createElement("h4");
          h4Element.textContent = movieElement.querySelector("h4").textContent;

          const buttonElement = document.createElement("button");
          buttonElement.setAttribute("type", "submit");
          const aElement = movieElement.querySelector("a").cloneNode(true);

          buttonElement.appendChild(aElement);
          movieDiv.appendChild(imgElement);
          movieDiv.appendChild(h4Element);
          movieDiv.appendChild(buttonElement);

          movieCoversSection.appendChild(movieDiv);
          const btHide = document.getElementById("loadMoreButton");
          btHide.style.display = "none";
        }
      });
    });

    // Function to normalize a string by removing diacritics and punctuation
    function normalizeString(str) {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,\/#!$?¡¿"'ªº]/g, "")
        .replace(/\s/g, "");
    }
  });
