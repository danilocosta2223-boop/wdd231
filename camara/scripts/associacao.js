document.addEventListener("DOMContentLoaded", () => {
    // 1. Timestamp do formulário (se existir)
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Abertura dos Modais (NP, Bronze, Silver, Gold)
    const modaisConfig = [
        { btnId: "np-btn", modalId: "modal-np" },
        { btnId: "bronze-btn", modalId: "modal-bronze" },
        { btnId: "silver-btn", modalId: "modal-silver" },
        { btnId: "gold-btn", modalId: "modal-gold" }
    ];

    modaisConfig.forEach(({ btnId, modalId }) => {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);

        if (btn && modal) {
            btn.addEventListener("click", () => {
                modal.showModal();
            });
        }
    });

    // 3. Fechamento dos Modais
    document.querySelectorAll(".close-modal").forEach(button => {
        button.addEventListener("click", () => {
            const dialog = button.closest("dialog");
            if (dialog) {
                dialog.close();
            }
        });
    });

    // 4. Menu Responsivo Mobile (Unificado e seguro)
    const menuButton = document.getElementById("menu-button");
    const navMenu = document.getElementById("animate-menu") || document.querySelector("nav");

    if (menuButton && navMenu) {
        menuButton.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
    }
});