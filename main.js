import { generateReturnsArray } from "./src/investmentGoals";

const form = document.getElementById("investment-form");

function renderProgression(e) {
  e.preventDefault();

  const startingAmount = parseFloat(form["starting-amount"].value);
  const additionalContribution = parseFloat(form["additional-contribution"].value);
  const timeAmount = parseFloat(form["time-amount"].value);
  const returnRate = parseFloat(form["return-rate"].value);
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

form.addEventListener("submit", renderProgression);
