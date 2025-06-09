import { generateReturnsArray } from "./src/investmentGoals";
import { Chart } from "chart.js/auto";
import { createTable } from "./src/table";

const finalMoneyChart = document.getElementById("final-money-distribution");
const progressionChart = document.getElementById("progression");
const form = document.getElementById("investment-form");
const buttonClearElement = document.getElementById("btn-clear-form");
let dougnhutChartReference = {};
let progressionChartReference = {};

const columnsArray = [
  { columnLabel: "Mês", accessor: "month" },
  {
    columnLabel: "Total Investido",
    accessor: "investedAmount",
    format: (info) => formatCurrency(info),
  },
  {
    columnLabel: "Rendimento Mensal",
    accessor: "interestReturns",
    format: (info) => formatCurrency(info),
  },
  {
    columnLabel: "Rendimento Total",
    accessor: "totalInterestReturns",
    format: (info) => formatCurrency(info),
  },
  {
    columnLabel: "Quantia Total",
    accessor: "totalAmount",
    format: (info) => formatCurrency(info),
  },
];

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function resetCharts() {
  if (
    !isObjectEmpty(dougnhutChartReference) &&
    !isObjectEmpty(progressionChartReference)
  ) {
    dougnhutChartReference.destroy();
    progressionChartReference.destroy();
  }
}

function renderProgression(e) {
  e.preventDefault();
  if (!!document.querySelector(".error")) {
    return;
  }

  resetCharts();
  const startingAmount = Number(
    form["starting-amount"].value.replace(",", ".")
  );
  const additionalContribution = Number(
    form["additional-contribution"].value.replace(",", ".")
  );
  const timeAmount = Number(form["time-amount"].value);
  const returnRate = Number(form["return-rate"].value.replace(",", "."));
  const taxRate = Number(form["tax-rate"].value);
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

  const finalInvestementObject = returnsArray[returnsArray.length - 1];

  /*dougnhutChartReference = new Chart(finalMoneyChart, {
    type: "doughnut",
    data: {
      labels: ["Total Investido", "Rendimento", "Imposto"],
      datasets: [
        {
          data: [
            formatCurrency(finalInvestementObject.investedAmount),
            formatCurrency(
              finalInvestementObject.totalInterestReturns * (1 - taxRate / 100)
            ),
            formatCurrency(
              finalInvestementObject.totalInterestReturns * (taxRate / 100)
            ),
          ],
          backgroundColor: [
            "rgb(0, 51, 102)",
            "rgb(0,255, 174)",
            "rgb(255, 255, 1)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  progressionChartReference = new Chart(progressionChart, {
    type: "bar",
    data: {
      labels: returnsArray.map((investmentObject) => investmentObject.month),
      datasets: [
        {
          label: "Total Investido",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.investedAmount)
          ),
          backgroundColor: "rgb(0, 51, 102)",
        },
        {
          label: "Retorno de Insvestimento",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.interestReturns)
          ),
          backgroundColor: "rgb(0,255, 174)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });
  */

  createTable(columnsArray, returnsArray, "results-table");
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

  resetCharts();
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
