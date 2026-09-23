import { locais } from "../data/locais.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#cards-container");
    if (container) {
        container.innerHTML = locais.map((local, index) => `
            <article class="interest-card card${index + 1}">
                <h2>${local.nome}</h2>
                <figure>
                    <img src="${local.imagem}" alt="${local.alt}" loading="lazy" width="300" height="200">
                </figure>
                <address>${local.endereco}</address>
                <p>${local.descricao}</p>
                <button type="button" class="cta-button">Saiba mais</button>
            </article>
        `).join("");
    }

    // Lógica do localStorage para visitas
    const visitorMessage = document.querySelector("#visitor-message");
    if (visitorMessage) {
        const lastVisit = localStorage.getItem("lastVisit-camara");
        const now = Date.now();

        if (!lastVisit) {
            visitorMessage.textContent = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
        } else {
            const diffTime = now - Number(lastVisit);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays < 1) {
                visitorMessage.textContent = "Já voltou? Que legal!";
            } else if (diffDays === 1) {
                visitorMessage.textContent = "Seu último acesso foi há 1 dia.";
            } else {
                visitorMessage.textContent = `Seu último acesso foi há ${diffDays} dias.`;
            }
        }
        localStorage.setItem("lastVisit-camara", now);
    }

    // Menu responsivo
    const menuButton = document.querySelector("#menu-button");
    const navigation = document.querySelector(".navigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("open");
            menuButton.textContent = navigation.classList.contains("open") ? "✕" : "☰";
        });
    }

    const currentYearSpan = document.querySelector("#currentYear");
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    const lastModifiedSpan = document.querySelector("#lastModified");
    if (lastModifiedSpan) lastModifiedSpan.textContent = `Última Modificação: ${document.lastModified}`;
});