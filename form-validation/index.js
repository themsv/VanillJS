const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  formControl.querySelector("small").innerText = message;
}
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

const capitalize = (str) => str[0].toUpperCase() + str.substring(1);
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${capitalize(input.id)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${capitalize(input.id)} must contain atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${capitalize(input.id)} shouldn't exceed ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
const checkEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value)) {
    showSuccess(email);
  } else {
    showError(email, "Email is not valid");
  }
};

const checkPasswordMatch = (input1, input2) => {
  console.log(input1.value);
  if (input1.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input2, `Password donot match`);
  }
};
form.addEventListener("submit", function (event) {
  event.preventDefault();
  checkRequired([username, email, password, password2]);
});

username.addEventListener("change", function (event) {
  event.preventDefault();
  checkLength(username, 6, 15);
});

email.addEventListener("change", function (event) {
  event.preventDefault();
  checkEmail(email);
});

password.addEventListener("change", function (event) {
  event.preventDefault();
  checkLength(password, 8, 20);
});
password2.addEventListener("change", function (event) {
  checkPasswordMatch(password, password2);
});
