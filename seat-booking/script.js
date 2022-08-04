const container = document.querySelector(".seats-container");
const seats = document.querySelectorAll(".seats-row .seat:not(.occupied)");
const price = document.getElementById("price");
const count = document.getElementById("count");
const movies = document.getElementById("movies");
let selectedMoviePrice = +movies.value;

populateUI();
populateSeatsBasedOnMovie();

const updateCountAndPrice = () => {
  const selectedSeats = document.querySelectorAll(".seats-row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  price.innerText = selectedSeatsCount * selectedMoviePrice;

  const selectedSeatsIndex = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );
  const selectedMovie = movies.options[movies.selectedIndex].innerText;

  localStorage.setItem(
    "selectedSeatsIndex",
    JSON.stringify(selectedSeatsIndex)
  );
  localStorage.setItem("selectedMovieIndex", movies.selectedIndex);
};
function populateSeatsBasedOnMovie() {
  const occupiedSeats = [
    [1, 2, 3],
    [4, 5],
    [6, 7, 8],
    [9, 10],
  ];
  const occupiedSeatsForMovie = occupiedSeats[movies.selectedIndex];
  [...seats].map((seat) => seat.classList.remove("occupied"));
  seats.forEach((seat, index) => {
    if (occupiedSeatsForMovie.indexOf(index) > -1) {
      seat.classList.add("occupied");
    }
  });
}

function populateUI() {
  storedSelectedSeats = JSON.parse(localStorage.getItem("selectedSeatsIndex"));
  selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  seats.forEach((seat, index) => {
    if (storedSelectedSeats?.indexOf(index) > -1) {
      seat.classList.add("selected");
    }
  });
  if (selectedMovieIndex != null) {
    movies.selectedIndex = selectedMovieIndex;
    selectedMoviePrice = movies.options[selectedMovieIndex].value;
  }
}

movies.addEventListener("change", (e) => {
  populateSeatsBasedOnMovie();
  selectedMoviePrice = e.target.value;
  updateCountAndPrice();
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCountAndPrice();
  }
});

updateCountAndPrice();
