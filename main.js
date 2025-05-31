import { generateReturnsArray } from "./src/investmentGoals";

const form = document.getElementById("investment-form");

const buttonClearElement = document.getElementById("btn-clear-form");

function renderProgression(e) {
  e.preventDefault();
  if (!!document.querySelector(".error")) {
    return;
  }

  const startingAmount = parseFloat(
    form["starting-amount"].value.replace(",", ".")
  );
  const additionalContribution = parseFloat(
    form["additional-contribution"].value.replace(",", ".")
  );
  const timeAmount = parseFloat(form["time-amount"].value);
  const returnRate = parseFloat(form["return-rate"].value.replace(",", "."));
  const taxRate = parseFloat(form["tax-rate"].value);
  const timeAmountPeriod = form["time-amount-period"].value;
  const returnRatePeriod = form["evoluation-period"].value;

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );

  console.log(returnsArray);
}

function validateInput(e) {
  const input = e.target;
  if (input.value === "") {
    return;
  }

  const { parentElement } = input;
  const grandParent = parentElement.parentElement;
  const inputValue = input.value.replace(",", ".");

  if (
    !parentElement.classList.contains("error") &&
    (isNaN(inputValue) || Number(inputValue) <= 0)
  ) {
    const errorTextElement = document.createElement("p");
    parentElement.classList.add("error");
    errorTextElement.classList.add("text-red-500", "text-sm");
    errorTextElement.innerHTML = " Insira um valor numérico e maior que zero.";
    grandParent.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains("error") &&
    !!grandParent.querySelector("p") &&
    (!isNaN(inputValue) || Number(inputValue) > 0)
  ) {
    parentElement.classList.remove("error");
    grandParent.querySelector("p").remove();
  }
}

function clearForm() {
  Array.from(form).forEach((element) => {
    if (element.tagName === "INPUT") {
      element.value = "";
    }
  });
  const inputContainers = document.querySelectorAll(".error");
  inputContainers.forEach((inputContainer) => {
    const grandParent = inputContainer.parentElement;
    inputContainer.classList.remove("error");
    grandParent.lastElementChild.remove();
  });
}

clearForm();
for (let i = 0; i < form.length; i++) {
  const input = form[i];
  if (input.tagName === "INPUT") {
    input.addEventListener("blur", validateInput);
  }
}

form.addEventListener("submit", renderProgression);
buttonClearElement.addEventListener("click", clearForm);
