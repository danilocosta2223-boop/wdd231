document.addEventListener("DOMContentLoaded", () => {
    // Captura os parâmetros da URL (método GET)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Obtém os valores de cada campo enviado pelo formulário
    const nome = urlParams.get("nome");
    const email = urlParams.get("email");
    const equipamento = urlParams.get("equipamento");
    const mensagem = urlParams.get("mensagem");

    // Elemento onde os dados serão exibidos na página obrigado.html
    const containerResultados = document.getElementById("resultados-chamado");

    if (containerResultados && nome) {
        // Exibe os dados formatados caso os parâmetros existam
        containerResultados.innerHTML = `
            <p><strong>Nome:</strong> ${escapeHTML(nome)}</p>
            <p><strong>E-mail:</strong> ${escapeHTML(email)}</p>
            <p><strong>Equipamento:</strong> ${escapeHTML(equipamento)}</p>
            <p><strong>Mensagem:</strong> ${escapeHTML(mensagem)}</p>
        `;
    } else if (containerResultados) {
        containerResultados.innerHTML = `<p>Nenhum dado de solicitação encontrado.</p>`;
    }
});

// Função auxiliar para evitar injeção de HTML (XSS básico)
function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}