export function renderTable(headers: string[], data: any[], tableHeader: HTMLTableRowElement, tableBody: HTMLTableSectionElement, itemsPerPage: number, currentPage: number): void {
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tableHeader.appendChild(th);
    });

    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start, end);

    paginatedData.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header] !== undefined ? row[header].toString() : '';
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

