const form = document.getElementById("input-form");
const addTodo = document.getElementById("todo-input");
const todoULEl = document.querySelector(".todo-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  var liEL = document.createElement("li");
  liEL.classList = "todo-item";
  liEL.innerHTML = `<ion-icon name="checkmark-outline" class="checkmark"></ion-icon>${addTodo.value}<ion-icon name="close-outline" class="close"></ion-icon>`;
  todoULEl.appendChild(liEL);
  addTodo.value = "";
});

todoULEl.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("checkmark") ||
    e.target.classList.contains("todo-item")
  ) {
    addTodo.value = "";
    e.target.classList.contains("checkmark")
      ? e.target.parentElement.classList.toggle("checked")
      : e.target.classList.add("checked");
  } else if (e.target.classList.contains("close")) {
    todoULEl.removeChild(e.target.parentElement);
  }
});
