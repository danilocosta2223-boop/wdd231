document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile com suporte correto a aria-expanded (booleano convertido para string)
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('animate-menu');
    
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    // 2. Alternância de Visualização (Grid / Lista)
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const directoryContainer = document.getElementById('directory-container');

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

    // 3. Carregamento de dados via Fetch API para o Diretório com validação segura de website
    if (!directoryContainer) return;

    async function loadEmpresas() {
        try {
            const response = await fetch('dados/empresas.json');
            if (!response.ok) {
                throw new Error(`Erro ao carregar: ${response.status}`);
            }
            const empresas = await response.json();
            directoryContainer.innerHTML = '';
            
            empresas.forEach(empresa => {
                const card = document.createElement('article');
                card.classList.add('card-local', 'card-animado');
                
                // Validação segura do link do website
                const websiteHtml = empresa.website 
                    ? `<a href="${empresa.website}" target="_blank" rel="noopener noreferrer">Visitar Website</a>`
                    : `<span>Website não informado</span>`;

                card.innerHTML = `
                    <img src="${empresa.imagem || 'imagens/hero.jpg'}" alt="Logótipo ou foto de ${empresa.nome}" loading="lazy">
                    <div class="info-card">
                        <h3>${empresa.nome}</h3>
                        <p><strong>Endereço:</strong> ${empresa.endereco || 'Endereço não informado'}</p>
                        <p><strong>Telefone:</strong> ${empresa.telefone || 'N/D'}</p>
                        <p>${websiteHtml}</p>
                    </div>
                `;
                directoryContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Erro no carregamento do diretório:', error);
            directoryContainer.innerHTML = `
                <p class="cartao-mensagem">
                    Não foi possível carregar o diretório de empresas no momento. Tente novamente mais tarde.
                </p>
            `;
        }
    }

    loadEmpresas();
});