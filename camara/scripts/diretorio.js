async function getMembersData() {
  try {
    const response = await fetch("dados/membros.json");

    if (!response.ok) {
      throw new Error(`Erro ao carregar o JSON: ${response.status}`);
    }

    const data = await response.json();

    const membersList = Array.isArray(data) ? data : (data.membros || []);

    console.log("Conteúdo de membersList:", membersList);

    displayMembers(membersList);

  } catch (error) {
    console.error("Erro na requisição dos membros:", error);
  }
}

function displayMembers(members) {
  const cardsContainer = document.querySelector("#members");

  if (!cardsContainer) {
    console.error("Elemento #members não foi encontrado no HTML!");
    return;
  }

  cardsContainer.innerHTML = "";

  members.forEach((empresa) => {
    const card = document.createElement("section");
    card.classList.add("card");

    card.innerHTML = `
      <img src="imagens/${empresa.imagem}" alt="${empresa.nome}">
      <h3>${empresa.nome}</h3>
      <p>${empresa.endereco}</p>
      <p>${empresa.telefone}</p>
      <a href="${empresa.site}" target="_blank" rel="noopener noreferrer">Visitar site</a>
    `;

    cardsContainer.appendChild(card);
  });
}

getMembersData();