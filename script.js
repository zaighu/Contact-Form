let textInputs = document.querySelectorAll(`input[type="text"],
  input[type="email"],
  textarea`);
let emailInput = document.querySelector(`input[type="email"]`);
let checkInput = document.querySelector(`input[type="checkbox"]`);
let radioInputs = document.querySelectorAll(`input[type="radio"]`);
let errorsDiv = document.querySelectorAll(".error");
let successMsg = document.querySelector(".success-msg");
let errors;
let InputsWithErrors;

const form = document.forms[0];

form.addEventListener("submit", function (event) {
  formValidator(event);
});

function formValidator(e) {
  // RESETS
  InputsWithErrors = [];
  errors = [];
  errorsDiv.forEach((f) => {
    f.innerHTML = "";
  });

  textInputs.forEach((input) => {
    input.style.borderColor = "hsl(186, 15%, 59%)";

    if (input.value == "" || input.value == null) {
      InputsWithErrors.push(input);
    }

    if (input.parentElement.classList[1] == "email") {
      if (!input.value.includes("@") && input.value != "") {
        InputsWithErrors.push(input);
      }
    }
  });

  if (checkInput.checked == false) {
    InputsWithErrors.push(checkInput);
  }

  if (radioInputs[0].checked == false && radioInputs[1].checked == false) {
    InputsWithErrors.push(radioInputs[0].parentElement.parentElement);
  }

  if (InputsWithErrors.length > 0) {
    InputsWithErrors.forEach((input) => {
      let parentInput = input.parentElement.classList;
      let error = document.querySelector(`.${parentInput[1]} .error`);
      error.style.paddingBlock = "0.5rem";
      errors.push(error);
      if (error.parentElement.classList[0] == "input-text") {
        document.querySelector(
          `.${parentInput[1]} input, .${parentInput[1]} textarea`
        ).style.borderColor = "hsl(0, 66%, 54%)";
        error.innerHTML = "This field is required";
      }

      if (error.parentElement.classList[1] == "email" && input.value != "") {
        error.innerHTML = "This email is not valid";
      }

      if (error.parentElement.classList[0] == "input-checkbox") {
        error.innerHTML =
          "To submit this form, please consent to being contacted";
      }

      if (error.parentElement.classList[0] == "input-options") {
        error.innerHTML = "Please select a query type";
      }
    });
  } else {
    successMsg.classList.add("open");
    setTimeout(() => {
      successMsg.classList.remove("open");
    }, 2000);
  }
  e.preventDefault();
}
