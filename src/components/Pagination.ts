export function renderPagination(totalItems: number, itemsPerPage: number, currentPage: number, onPageChange: (page: number) => void, paginationContainer: HTMLDivElement): void {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 0; i < totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = (i + 1).toString();
        button.disabled = i === currentPage;
        button.addEventListener('click', () => {
            onPageChange(i);
        });
        paginationContainer.appendChild(button);
    }
}
