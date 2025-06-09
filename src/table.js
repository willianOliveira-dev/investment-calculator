const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

export function resetTable(tableID) {
  const table = document.getElementById(tableID);
  if (!table || table.nodeName !== "TABLE") {
    throw new Error("Id informado não corresponde a nenhum elemento table.");
  }
  table.innerHTML = "";
}

export const createTable = (columnsArray, dataArray, tableId) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableId
  ) {
    throw new Error(
      "Para a correta execução, precisamos de um array com as colunas, outro com as informações das linhas e também o id do elemento tabela selecionado."
    );
  }

  const tableElement = document.getElementById(tableId);

  if (!tableElement || tableElement.nodeName !== "TABLE") {
    throw new Error("Id informado não corresponde a nenhum elemento table.");
  }
  resetTable(tableId);
  createTableHeader(tableElement, columnsArray);
  createTableBody(tableElement, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
  const createTheadElement = (tableReference) => {
    const thead = document.createElement("thead");
    tableReference.appendChild(thead);
    return thead;
  };

  const tableHeaderReference =
    document.querySelector("thead") ?? createTheadElement(tableReference);
  const headerRow = document.createElement("tr");
  ["bg-rich-input", "text-rich-text", "sticky", "top-0"].forEach((cssClass) =>
    headerRow.classList.add(cssClass)
  );
  for (const columnArrayObject of columnsArray) {
    const headerElement = `<th class="text-center">${columnArrayObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }

  tableHeaderReference.appendChild(headerRow);
}

function createTableBody(tableReference, tableItems, columnsArray) {
  function createTbodyElement(tableReference) {
    const tbody = document.createElement("tbody");
    tableReference.appendChild(tbody);
    return tbody;
  }
  const tableBodyReference =
    tableReference.querySelector("tbody") ?? createTbodyElement(tableReference);

  for (const [itemIndex, tableItem] of tableItems.entries()) {
    const tableRow = document.createElement("tr");

    if (itemIndex % 2 !== 0) {
      tableRow.classList.add("bg-rich-highlight");
    }

    for (const tableColumn of columnsArray) {
      const formatFn = tableColumn.format ?? ((info) => info);
      const dataElement = `<td class="text-center">${formatFn(
        tableItem[tableColumn.accessor]
      )}</td>`;
      tableRow.innerHTML += dataElement;
    }

    tableBodyReference.appendChild(tableRow);
  }
}
