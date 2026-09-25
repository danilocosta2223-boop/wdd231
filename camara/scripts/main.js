document.addEventListener("DOMContentLoaded", () => {
    // Atualiza o ano no rodapé
    const yearElem = document.getElementById("year");
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // Atualiza a data da última modificação
    const lastModifiedElem = document.getElementById("lastModified");
    if (lastModifiedElem) {
        lastModifiedElem.textContent = document.lastModified;
    }

    // Controle do menu responsivo
    const menuButton = document.getElementById("menu-button");
    const primaryNav = document.getElementById("primary-nav");

    if (menuButton && primaryNav) {
        menuButton.addEventListener("click", () => {
            primaryNav.classList.toggle("open");
            menuButton.classList.toggle("open");
        });
    }
});