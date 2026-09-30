export function renderTable({ title, columns, rows, note }, containerEl) {
  const container = containerEl || document.createElement("div");
  container.className = "card mb-4 shadow-sm";
  container.innerHTML = "";

  if (title) {
    const header = document.createElement("div");
    header.className = "card-header bg-dark text-white";
    header.innerHTML = `<h5 class="mb-0">${title}</h5>`;
    container.appendChild(header);
  }

  const tableWrapper = document.createElement("div");
  tableWrapper.className = "table-responsive";

  const table = document.createElement("table");
  table.className = "table table-striped table-hover mb-0";

  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  columns.forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  rows.forEach((rowData) => {
    const tr = document.createElement("tr");
    rowData.forEach((cellData) => {
      const td = document.createElement("td");
      td.innerHTML = cellData; // <--- Changed from textContent to innerHTML
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  tableWrapper.appendChild(table);
  container.appendChild(tableWrapper);

  if (note) {
    const footer = document.createElement("div");
    footer.className = "card-footer text-muted small";
    footer.textContent = note;
    container.appendChild(footer);
  }

  return container;
}
