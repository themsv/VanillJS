const container = document.querySelector(".seats-container");
// const seats = document.querySelectorAll("seats-row .seat:not(.occupied)");
const price = document.getElementById("price");
const count = document.getElementById("count");
const selectedMovie = document.getElementById("movies");
let selectedMoviePrice = +selectedMovie.value;
const updateTicketPrice = () => {
  const seats = document.querySelectorAll(".seats-row .seat.selected");
  const selectedSeatsCount = seats.length;
  count.innerText = selectedSeatsCount;
  price.innerText = selectedSeatsCount * selectedMoviePrice;
};

selectedMovie.addEventListener("change", (e) => {
  selectedMoviePrice = e.target.value;
  updateTicketPrice();
});
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateTicketPrice();
  }
});
