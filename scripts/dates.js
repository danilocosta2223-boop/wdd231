// Ano atual no rodapé
const currentYear = document.querySelector('#currentYear');

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Data da última modificação
const lastModified = document.querySelector('#lastModified');

if (lastModified) {
    lastModified.textContent =
        `Última Modificação: ${document.lastModified}`;
}