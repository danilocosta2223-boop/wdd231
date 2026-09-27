// Aguarda o carregamento completo do DOM para garantir que o elemento container exista
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const container = document.getElementById('resultados-formulario');

    const camposDesejados = [
        { key: 'nome', label: 'Nome' },
        { key: 'sobrenome', label: 'Sobrenome' },
        { key: 'email', label: 'E-mail' },
        { key: 'telefone', label: 'Telefone' },
        { key: 'organizacao', label: 'Organização' },
        { key: 'timestamp', label: 'Data e Hora do Registro' }
    ];

    let html = '<ul>';
    camposDesejados.forEach(campo => {
        const valor = params.get(campo.key) || 'Não informado';
        html += `<li><strong>${campo.label}:</strong> ${valor}</li>`;
    });
    html += '</ul>';

    if (container) {
        container.innerHTML = html;
    }
});