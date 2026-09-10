// Script para o Diretório de Empresas da Câmara de Comércio de São Paulo

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Responsivo Mobile
    const menuButton = document.getElementById('menuButton');
    const navMenu = document.getElementById('navMenu');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !expanded);
        });
    }

    // 2. Rodapé Dinâmico (Ano atual e última modificação)
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedP = document.getElementById('lastModified');
    if (lastModifiedP) {
        lastModifiedP.textContent = `Última atualização: ${document.lastModified}`;
    }

    // 3. Carregamento e Exibição do Diretório de Membros
    const directoryContainer = document.querySelector('#directory-container');
    const gridButton = document.querySelector('#grid');
    const listButton = document.querySelector('#list');

    // Função para buscar os dados do arquivo JSON
    async function getMembersData() {
        try {
            const response = await fetch('data/membros.json');
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo de membros.');
            }
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error(error);
            if (directoryContainer) {
                directoryContainer.innerHTML = `<p>Não foi possível carregar o diretório de empresas no momento.</p>`;
            }
        }
    }

    // Função para renderizar os cards na tela
    function displayMembers(members) {
        if (!directoryContainer) return;

        directoryContainer.innerHTML = ''; // Limpa o container

        members.forEach(member => {
            const card = document.createElement('section');
            card.classList.add('member-card');

            // Mapeia o nível de associação para exibição legível
            let membershipText = 'Membro Regular';
            if (member.membership === 2) membershipText = 'Membro Prata';
            if (member.membership >= 3) membershipText = 'Membro Ouro';

            card.innerHTML = `
                <img src="imagens/${member.image}" alt="${member.name}" class="member-img" loading="lazy">
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p class="member-address">📍 ${member.address}</p>
                    <p class="member-phone">📞 ${member.phone}</p>
                    <p class="member-web"><a href="${member.website}" target="_blank" rel="noopener">Visitar Website</a></p>
                    <p class="member-level"><strong>Nível:</strong> ${membershipText}</p>
                    <p class="member-other"><em>${member.description || ''}</em></p>
                </div>
            `;

            directoryContainer.appendChild(card);
        });
    }

    // 4. Alternância entre Visualização em Grade (Grid) e Lista (List)
    if (gridButton && listButton && directoryContainer) {
        gridButton.addEventListener('click', () => {
            directoryContainer.classList.add('directory-grid');
            directoryContainer.classList.remove('directory-list');
            gridButton.classList.add('active');
            listButton.classList.remove('active');
        });

        listButton.addEventListener('click', () => {
            directoryContainer.classList.add('directory-list');
            directoryContainer.classList.remove('directory-grid');
            listButton.classList.add('active');
            gridButton.classList.remove('active');
        });
    }

    // Inicializa a busca dos dados
    getMembersData();
});