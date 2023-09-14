"strict";
AOS.init();

var email = document.querySelector("#exampleFormControlInput1");
var password = document.querySelector("#exampleFormControlInput2");
var submit = document.querySelector(".submit-btn");
var form = document.querySelector("form");
var firstsection = document.querySelector(".firstsection");
var anchor = document.querySelector(".anchor");
var regex;
//validation for password and email
function validate(e) {
  pattern = "[a-z0-9._+-]+@[a-z0-9.-]+.[a-z]{2,}$";
  regex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!#@$%^&(){}[\]:;<>,.?/~_+\-=|]).{8,32}$/;
  if (
    !email.value.match(pattern) ||
    email.value === " " ||
    password.value === " "
  ) {
    alert("please enter a valid email and a password");
    e.preventDefault();
  }
  if (!password.value.match(regex)) {
    password.classList.add("false");
  } else {
    anchor.href = "quiz.html";
  }
}
//function for password visibilty
function visibleFunction() {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}
//submit click event
form.addEventListener("submit", (e) => {
  validate();
});

submit.addEventListener("click", (e) => {
  validate();
});
