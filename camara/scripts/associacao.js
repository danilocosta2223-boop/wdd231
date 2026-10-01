document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");

    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const modaisConfig = [
        { btnId: "np-btn", modalId: "modal-np" },
        { btnId: "bronze-btn", modalId: "modal-bronze" },
        { btnId: "silver-btn", modalId: "modal-silver" },
        { btnId: "gold-btn", modalId: "modal-gold" }
    ];

    modaisConfig.forEach(({ btnId, modalId }) => {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);

        if (!btn || !modal) return;

        btn.addEventListener("click", () => {
            modal.showModal();
        });
    });

    document.querySelectorAll(".close-modal").forEach(button => {
        button.addEventListener("click", () => {
            const dialog = button.closest("dialog");

            if (dialog) {
                dialog.close();
            }
        });
    });
});