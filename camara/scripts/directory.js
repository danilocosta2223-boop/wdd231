const membersContainer = document.querySelector("#membersContainer");
const gridButton = document.querySelector("#gridButton");
const listButton = document.querySelector("#listButton");
const membersUrl = "data/membros.json";

async function getMembers() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error("Erro ao carregar membros.");
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Erro:", error);
        if (membersContainer) {
            membersContainer.innerHTML = "<p>Não foi possível carregar os dados dos membros.</p>";
        }
    }
}

function displayMembers(members) {
    if (!membersContainer) return;
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        let levelText = member.membership === 3 ? "Ouro" : (member.membership === 2 ? "Prata" : "Padrão");

        card.innerHTML = `
            <img src="imagens/${member.image}" alt="Logo de ${member.name}" loading="lazy">
            <div class="member-info">
                <div>
                    <h3>${member.name}</h3>
                    <p><em>${member.address}</em></p>
                    <p>${member.phone}</p>
                </div>
                <div>
                    <p><a href="${member.website}" target="_blank" rel="noopener">Website</a></p>
                    <p><strong>Nível:</strong> ${levelText}</p>
                </div>
            </div>
        `;
        membersContainer.appendChild(card);
    });
}

if (gridButton && listButton && membersContainer) {
    gridButton.addEventListener("click", () => {
        membersContainer.classList.add("grid-view");
        membersContainer.classList.remove("list-view");
        gridButton.classList.add("active");
        listButton.classList.remove("active");
    });

    listButton.addEventListener("click", () => {
        membersContainer.classList.add("list-view");
        membersContainer.classList.remove("grid-view");
        listButton.classList.add("active");
        gridButton.classList.remove("active");
    });
}

getMembers();