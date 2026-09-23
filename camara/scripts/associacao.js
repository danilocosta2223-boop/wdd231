document.addEventListener("DOMContentLoaded", () => {
    // 1. Preencher o campo oculto de timestamp com a data e hora atual
    const timestampField = document.querySelector("#timestamp");
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toLocaleString("pt-BR");
    }

    // 2. Controle dos Modais HTML (<dialog>)
    const modalButtons = document.querySelectorAll(".modal-btn");
    const closeButtons = document.querySelectorAll(".close-modal");

    modalButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) modal.showModal();
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest("dialog");
            if (modal) modal.close();
        });
    });

    // 3. Menu responsivo (Wayfinding / Menu Mobile)
    const menuButton = document.querySelector("#menu-button");
    const navigation = document.querySelector(".navigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("open");
            menuButton.textContent = navigation.classList.contains("open") ? "✕" : "☰";
        });
    }

    // Rodapé dinâmico
    const currentYearSpan = document.querySelector("#currentYear");
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    const lastModifiedSpan = document.querySelector("#lastModified");
    if (lastModifiedSpan) lastModifiedSpan.textContent = `Última Modificação: ${document.lastModified}`;
});