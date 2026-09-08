const url = "dados/membros.json";
const directory = document.querySelector("#directory");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");

async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Não foi possível buscar os membros:", error);
    }
}

function displayMembers(members) {
    if (!directory) return;
    directory.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        let levelText = "Membro Comum";
        if (member.membership === 2) levelText = "Membro Prata";
        if (member.membership === 3) levelText = "Membro Ouro";

        card.innerHTML = `
            <img src="imagens/${member.image}" alt="Logo de ${member.name}" loading="lazy">
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="tagline">${member.description}</p>
                <p><strong>Endereço:</strong> ${member.address}</p>
                <p><strong>Telefone:</strong> ${member.phone}</p>
                <p><strong>Nível:</strong> ${levelText}</p>
                <a href="${member.website}" target="_blank" rel="noopener">Visitar Website</a>
            </div>
        `;

        directory.appendChild(card);
    });
}

if (gridButton && listButton && directory) {
    gridButton.addEventListener("click", () => {
        directory.classList.add("grid");
        directory.classList.remove("list");
        gridButton.classList.add("active-view");
        listButton.classList.remove("active-view");
    });

    listButton.addEventListener("click", () => {
        directory.classList.add("list");
        directory.classList.remove("grid");
        listButton.classList.add("active-view");
        gridButton.classList.remove("active-view");
    });
}

if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        if (navMenu.classList.contains("open")) {
            menuButton.textContent = "✕";
        } else {
            menuButton.textContent = "☰";
        }
    });
}

const currentYearElement = document.querySelector("#currentYear");
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

const lastModifiedElement = document.querySelector("#lastModified");
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Última Modificação: ${document.lastModified}`;
}

getMembers();