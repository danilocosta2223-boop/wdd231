import { locais } from "../dados/locais.mjs";

// 1. Renderização dos Cartões Dinâmicos com Lazy Loading (com verificação do container)
const container = document.getElementById("cards-locais");

if (container) {
    locais.forEach(local => {
        const card = document.createElement("article");
        card.classList.add("card-local", "card-animado");
        
        card.innerHTML = `
            <h2>${local.nome}</h2>
            <figure>
                <img src="${local.imagem}" alt="${local.nome}" loading="lazy" width="300" height="200">
            </figure>
            <address>${local.endereco}</address>
            <p>${local.descricao}</p>
            <button>Saiba mais</button>
        `;
        
        container.appendChild(card);
    });
}

// 2. Lógica do LocalStorage para a Mensagem de Visita (com verificação do elemento)
const mensagem = document.getElementById("mensagem-visita");

if (mensagem) {
    const ultimaVisita = localStorage.getItem("ultimaVisita");
    const agora = Date.now();

    if (!ultimaVisita) {
        mensagem.textContent = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
    } else {
        const dias = Math.floor((agora - Number(ultimaVisita)) / (1000 * 60 * 60 * 24));

        if (dias < 1) {
            mensagem.textContent = "Já voltou? Que legal!";
        } else if (dias === 1) {
            mensagem.textContent = "Seu último acesso foi há 1 dia.";
        } else {
            mensagem.textContent = `Seu último acesso foi há ${dias} dias.`;
        }
    }

    localStorage.setItem("ultimaVisita", agora);
}