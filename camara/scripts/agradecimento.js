document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const resultadoDiv = document.querySelector("#resultado-formulario");

    const nome = urlParams.get("nombre") || "Não informado";
    const sobrenome = urlParams.get("apellido") || "Não informado";
    const cargo = urlParams.get("cargo") || "Não informado";
    const email = urlParams.get("email") || "Não informado";
    const phone = urlParams.get("phone") || "Não informado";
    const organizacao = urlParams.get("organizacao") || "Não informado";
    const nivel = urlParams.get("nivel") || "Não informado";
    const timestamp = urlParams.get("timestamp") || "Não informado";

    if (resultadoDiv) {
        resultadoDiv.innerHTML = `
            <p><strong>Nome Completo:</strong> ${nome} ${sobrenome}</p>
            <p><strong>Cargo:</strong> ${cargo}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone}</p>
            <p><strong>Empresa/Organização:</strong> ${organizacao}</p>
            <p><strong>Nível de Associação:</strong> ${nivel.toUpperCase()}</p>
            <p><strong>Data e Hora do Cadastro:</strong> ${timestamp}</p>
        `;
    }

    // Rodapé
    const currentYearSpan = document.querySelector("#currentYear");
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
    const lastModifiedSpan = document.querySelector("#lastModified");
    if (lastModifiedSpan) lastModifiedSpan.textContent = `Última Modificação: ${document.lastModified}`;
});