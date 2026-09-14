const url = 'dados/membros.json';
const cards = document.querySelector('#directory-container');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

// Função para buscar os dados dos membros
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error('Erro ao carregar dados:', response.statusText);
        }
    } catch (error) {
        console.error('Erro de rede ou busca:', error);
    }
}

// Função para renderizar as cartas dos membros
const displayMembers = (members) => {
    cards.innerHTML = '';
    members.forEach((member) => {
        let card = document.createElement('section');
        card.classList.add('member-card');

        let name = document.createElement('h3');
        name.textContent = member.nome;

        let image = document.createElement('img');
        image.setAttribute('src', `imagens/${member.imagem}`);
        image.setAttribute('alt', `Logo de ${member.nome}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '200');
        image.setAttribute('height', '150');

        let address = document.createElement('p');
        address.textContent = member.endereco;

        let phone = document.createElement('p');
        phone.textContent = member.telefone;

        let website = document.createElement('a');
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');
        website.textContent = member.website;

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        cards.appendChild(card);
    });
};

// Event Listeners para alternância entre Grade e Lista
if (gridButton && listButton) {
    gridButton.addEventListener('click', () => {
        cards.classList.add('directory-grid');
        cards.classList.remove('directory-list');
    });

    listButton.addEventListener('click', () => {
        cards.classList.add('directory-list');
        cards.classList.remove('directory-grid');
    });
}

// Inicializa a busca dos membros
getMembers();