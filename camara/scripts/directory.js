document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.querySelector("#members-container");
    const gridButton = document.querySelector("#grid");
    const listButton = document.querySelector("#list");

    // Testes de diagnóstico de elementos no DOM
    console.log("Container:", membersContainer);
    console.log("Botão Grade:", gridButton);
    console.log("Botão Lista:", listButton);

    const getMembers = async () => {
        try {
            const response = await fetch("./dados/membros.json");
            
            if (!response.ok) {
                throw new Error(`HTTP erro: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Membros carregados:", data);
            
            displayMembers(data);
        } catch (error) {
            console.error("Erro ao carregar JSON:", error);
            if (membersContainer) {
                membersContainer.innerHTML = `
                    <p style="color:red; text-align:center; padding: 2rem;">
                        Erro ao carregar os membros. Verifique o console (F12).
                    </p>
                `;
            }
        }
    };

    const displayMembers = (members) => {
        if (!membersContainer) return;
        
        membersContainer.innerHTML = "";

        members.forEach((member) => {
            const card = document.createElement("article");
            card.classList.add("member-card");

            const img = document.createElement("img");
            img.setAttribute("src", `imagens/${member.imagem}`);
            img.setAttribute("alt", `Logo de ${member.nome}`);
            img.setAttribute("loading", "lazy");

            const name = document.createElement("h3");
            name.textContent = member.nome;

            const address = document.createElement("p");
            address.innerHTML = `<strong>Endereço:</strong> ${member.endereco}`;

            const phone = document.createElement("p");
            phone.innerHTML = `<strong>Telefone:</strong> ${member.telefone}`;

            const website = document.createElement("a");
            website.setAttribute("href", member.website);
            website.setAttribute("target", "_blank");
            website.textContent = "Visitar Site";

            const membership = document.createElement("p");
            membership.innerHTML = `<strong>Nível:</strong> ${member.nivel}`;

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(address);
            card.appendChild(phone);
            card.appendChild(membership);
            card.appendChild(website);

            membersContainer.appendChild(card);
        });
    };

    if (gridButton && listButton && membersContainer) {
        gridButton.addEventListener("click", () => {
            membersContainer.classList.add("grid");
            membersContainer.classList.remove("list");
            gridButton.classList.add("active");
            listButton.classList.remove("active");
        });

        listButton.addEventListener("click", () => {
            membersContainer.classList.add("list");
            membersContainer.classList.remove("grid");
            listButton.classList.add("active");
            gridButton.classList.remove("active");
        });
    }

    getMembers();

    const currentYearSpan = document.querySelector("#currentYear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedSpan = document.querySelector("#lastModified");
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = `Última Modificação: ${document.lastModified}`;
    }
});