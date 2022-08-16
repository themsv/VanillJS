const logo = document.getElementById("logo");

const toggle = document.getElementById("toggle");
const open = document.getElementById("open");
const close = document.getElementById("close");
const modal = document.getElementById("modal-signup");

logo.src = `https://randomuser.me/api/portraits/men/${Math.floor(
  Math.random() * (50 - 1)
)}.jpg`;

toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

open.addEventListener("click", () => modal.classList.add("show-modal"));
close.addEventListener("click", () => modal.classList.remove("show-modal"));

window.addEventListener("click", (e) =>
  e.target.id == "modal-signup" ? modal.classList.remove("show-modal") : false
);
