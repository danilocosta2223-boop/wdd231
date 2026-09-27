document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const modaisConfig = [
        { btnId: 'np-btn', modalId: 'modal-np' },
        { btnId: 'bronze-btn', modalId: 'modal-bronze' },
        { btnId: 'silver-btn', modalId: 'modal-silver' },
        { btnId: 'gold-btn', modalId: 'modal-gold' }
    ];

    modaisConfig.forEach(item => {
        const btn = document.getElementById(item.btnId);
        const modal = document.getElementById(item.modalId);
        if (btn && modal) {
            btn.addEventListener('click', () => {
                modal.showModal();
            });
        }
    });

    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dialog = button.closest('dialog');
            if (dialog) {
                dialog.close();
            }
        });
    });
});