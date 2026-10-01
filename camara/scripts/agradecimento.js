document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("resultados-formulario");

    if (!container) return;

    const params = new URLSearchParams(window.location.search);

    const camposDesejados = [
        { key: "nome", label: "Nome" },
        { key: "sobrenome", label: "Sobrenome" },
        { key: "email", label: "E-mail" },
        { key: "telefone", label: "Telefone" },
        { key: "organizacao", label: "Organização" },
        { key: "timestamp", label: "Data e Hora do Registro" }
    ];

    let html = "<ul>";

    camposDesejados.forEach(campo => {
        const valor = params.get(campo.key) || "Não informado";
        html += `<li><strong>${campo.label}:</strong> ${valor}</li>`;
    });

    html += "</ul>";

    container.innerHTML = html;
});