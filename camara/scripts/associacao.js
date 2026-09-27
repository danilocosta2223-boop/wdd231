// Preenche o campo oculto com a data e hora atuais do carregamento
const timestampField = document.getElementById('timestamp');
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

// Configuração dos modais via addEventListener (sem onclick inline)
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