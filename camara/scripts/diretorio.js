document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members");
    const gridBtn = document.getElementById("gridBtn");
    const listBtn = document.getElementById("listBtn");

    async function getMembersData() {
        try {
            const response = await fetch("dados/membros.json");

            if (!response.ok) {
                throw new Error("Erro ao carregar o arquivo de membros.");
            }

            const data = await response.json();

            const membersList = Array.isArray(data) ? data : data.membros;

            displayMembers(membersList);

        } catch (error) {
            console.error("Erro na busca de membros:", error);

            if (membersContainer) {
                membersContainer.innerHTML =
                    "<p>Não foi possível carregar o diretório de membros no momento.</p>";
            }
        }
    }

    function displayMembers(members) {

        if (!membersContainer || !Array.isArray(members)) return;

        membersContainer.innerHTML = "";

        members.forEach((member) => {

            const card = document.createElement("section");
            card.classList.add("member-card");

            const levelText =
                member.nivel === 3
                    ? "Ouro"
                    : member.nivel === 2
                    ? "Prata"
                    : "Associado";

            card.innerHTML = `
                imagens/${member.imagem}
                <h3>${member.nome}</h3>
                <p class="address">${member.endereco}</p>
                <p class="phone">${member.telefone}</p>
                <p class="level"><strong>Nível:</strong> ${levelText}</p>
                ${member.site}Visitar Website</a>
            `;

            membersContainer.appendChild(card);
        });
    }

    if (gridBtn && listBtn && membersContainer) {

        gridBtn.addEventListener("click", () => {
            membersContainer.classList.add("grid-view");
            membersContainer.classList.remove("list-view");

            gridBtn.classList.add("active");
            listBtn.classList.remove("active");
        });

        listBtn.addEventListener("click", () => {
            membersContainer.classList.add("list-view");
            membersContainer.classList.remove("grid-view");

            listBtn.classList.add("active");
            gridBtn.classList.remove("active");
        });
    }

    getMembersData();
});