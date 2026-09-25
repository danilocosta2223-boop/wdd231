document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('animate-menu');
    const directoryContainer = document.getElementById('directory-container');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');

    // Menu Responsivo Mobile
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Carregar dados do ficheiro JSON de membros
    async function loadMembers() {
        try {
            const response = await fetch('dados/membros.json');
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error('Erro ao carregar o diretório de membros:', error);
            if (directoryContainer) {
                directoryContainer.innerHTML = '<p>Não foi possível carregar os dados dos membros no momento.</p>';
            }
        }
    }

    function displayMembers(members) {
        if (!directoryContainer) return;
        directoryContainer.innerHTML = '';

        members.forEach(member => {
            const card = document.createElement('article');
            card.classList.add('member-card');

            card.innerHTML = `
                <img src="${member.imagem}" alt="Logótipo de ${member.nome}" width="100" height="100" loading="lazy">
                <div>
                    <h3>${member.nome}</h3>
                    <p class="member-level">${member.nivel}</p>
                    <p>${member.endereco}</p>
                    <p>${member.telefone}</p>
                    <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visitar Website</a>
                </div>
            `;
            directoryContainer.appendChild(card);
        });
    }

    // Alternar entre visualização de grelha e lista
    if (gridViewBtn && listViewBtn && directoryContainer) {
        gridViewBtn.addEventListener('click', () => {
            directoryContainer.classList.add('grid');
            directoryContainer.classList.remove('list');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        });

        listViewBtn.addEventListener('click', () => {
            directoryContainer.classList.add('list');
            directoryContainer.classList.remove('grid');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        });
    }

    loadMembers();
});