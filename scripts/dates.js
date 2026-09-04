// Atualiza o ano atual no rodapé
const currentYear = document.querySelector("#currentYear");
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Atualiza a data da última modificação no rodapé
const lastModified = document.querySelector("#lastModified");
if (lastModified) {
    lastModified.textContent = `Última Modificação: ${document.lastModified}`;
}