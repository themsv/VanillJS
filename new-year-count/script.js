const yearEl = document.getElementById("year"),
  daysEl = document.querySelector(".days"),
  hoursEl = document.querySelector(".hours"),
  minutesEl = document.querySelector(".minutes"),
  secondsEl = document.querySelector(".seconds");
const loader = document.querySelector("img"),
  countdown = document.querySelector(".countdown");

// Update the time
function timeLeft() {
  const currentYear = new Date().getFullYear();
  yearEl.innerText = currentYear;
  const endtime = `${currentYear + 1}-01-01T00:00:00`;

  // the result t is in milliseconds
  const t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  [
    daysEl.innerText,
    hoursEl.innerText,
    minutesEl.innerText,
    secondsEl.innerText,
  ] = [
    days,
    hours < 10 ? "0" + hours : hours,
    minutes < 10 ? "0" + minutes : minutes,
    seconds < 10 ? "0" + seconds : seconds,
  ];
}

setTimeout(() => {
  loader.remove();
  countdown.style.display = "flex";
}, 1000);

// run every second
setInterval(timeLeft, 1000);
