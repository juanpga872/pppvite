import { parseCSV } from './utils/csvParser';
import { renderTable } from './components/Table';
import { renderPagination } from './components/Pagination';

const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const searchInput = document.getElementById('searchInput') as HTMLInputElement;
const tableHeader = document.getElementById('tableHeader') as HTMLTableRowElement;
const tableBody = document.getElementById('tableBody') as HTMLTableSectionElement;
const pagination = document.getElementById('pagination') as HTMLDivElement;

let currentData: any[] = [];
let filteredData: any[] = [];
let currentPage = 0;
const itemsPerPage = 10;

fileInput.addEventListener('change', handleFileUpload);
searchInput.addEventListener('input', handleSearch);

function handleFileUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        parseCSV(file, (data) => {
            currentData = data;
            filteredData = currentData;
            renderTableAndPagination();
        }, (error) => {
            console.error('Error al parsear el archivo:', error);
        });
    }
}

function handleSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    filteredData = currentData.filter(row =>
        Object.values(row).some((value: any) => 
            value.toString().toLowerCase().includes(searchTerm)
        )
    );
    currentPage = 0;
    renderTableAndPagination();
}

function renderTableAndPagination(): void {
    if (filteredData.length > 0) {
        const headers = Object.keys(filteredData[0]);
        renderTable(headers, filteredData, tableHeader, tableBody, itemsPerPage, currentPage);
        renderPagination(filteredData.length, itemsPerPage, currentPage, (page) => {
            currentPage = page;
            renderTableAndPagination();
        }, pagination);
    } else {
        tableHeader.innerHTML = '';
        tableBody.innerHTML = '';
        pagination.innerHTML = '';
    }
}