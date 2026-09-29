// scripts/equipamentos.js

// 1. Seletores do DOM
const containerEquipamentos = document.getElementById("lista-equipamentos");
const filtroSetor = document.getElementById("filtro-setor");
const modalDetalhes = document.getElementById("modal-detalhes");
const modalConteudo = document.getElementById("modal-conteudo");
const botaoFecharModal = document.getElementById("fechar-modal");

let todosEquipamentos = [];

// 2. Função principal para buscar os dados do JSON com Try/Catch
async function carregarEquipamentos() {
    try {
        const resposta = await fetch("dados/equipamentos.json");
        
        if (!resposta.ok) {
            throw new Error(`Erro ao carregar dados: ${resposta.statusText}`);
        }

        todosEquipamentos = await resposta.json();
        
        // Registra o uso no LocalStorage (exigência da rubrica)
        localStorage.setItem("ultimaPaginaVisitada", "equipamentos.html");
        localStorage.setItem("totalEquipamentosCarregados", todosEquipamentos.length);

        renderizarEquipamentos(todosEquipamentos);
    } catch (erro) {
        console.error("Falha na requisição dos equipamentos:", erro);
        if (containerEquipamentos) {
            containerEquipamentos.innerHTML = `<p class="erro">Não foi possível carregar os equipamentos no momento. Tente novamente mais tarde.</p>`;
        }
    }
}

// 3. Função para renderizar os cartões usando Template Literals e forEach
function renderizarEquipamentos(lista) {
    if (!containerEquipamentos) return;
    
    containerEquipamentos.innerHTML = "";

    lista.forEach(eq => {
        const cartao = document.createElement("article");
        cartao.classList.add("cartao-equipamento");

        // Template Literal estruturando o card
        cartao.innerHTML = `
            <figure>
                <img src="${eq.imagem}" alt="${eq.nome}" loading="lazy" width="300" height="200">
            </figure>
            <div class="info-card">
                <h3>${eq.nome}</h3>
                <p><strong>Setor:</strong> ${eq.setor}</p>
                <p><strong>Fabricante:</strong> ${eq.fabricante}</p>
                <p><strong>Status:</strong> <span class="status ${eq.status === 'Operacional' ? 'ativo' : 'manutencao'}">${eq.status}</span></p>
                <button class="btn-detalhes" data-nome="${eq.nome}">Ver Detalhes</button>
            </div>
        `;

        containerEquipamentos.appendChild(cartao);
    });

    // Adiciona evento de clique para abrir o Modal em cada botão gerado
    document.querySelectorAll(".btn-detalhes").forEach(botao => {
        botao.addEventListener("click", (e) => {
            const nomeEquipamento = e.target.getAttribute("data-nome");
            abrirModalDetalhes(nomeEquipamento);
        });
    });
}

// 4. Lógica do Modal com o elemento <dialog>
function abrirModalDetalhes(nome) {
    const equipamento = todosEquipamentos.find(eq => eq.nome === nome);
    if (!equipamento || !modalDetalhes) return;

    modalConteudo.innerHTML = `
        <h2>${equipamento.nome}</h2>
        <img src="${equipamento.imagem}" alt="${equipamento.nome}" width="200" class="imagem-modal">
        <p><strong>Setor:</strong> ${equipamento.setor}</p>
        <p><strong>Fabricante:</strong> ${equipamento.fabricante}</p>
        <p><strong>Status:</strong> ${equipamento.status}</p>
        <p><strong>Descrição Técnica:</strong> ${equipamento.descricao}</p>
    `;

    modalDetalhes.showModal();
}

if (botaoFecharModal && modalDetalhes) {
    botaoFecharModal.addEventListener("click", () => {
        modalDetalhes.close();
    });

    // Fecha o modal ao clicar fora dele
    modalDetalhes.addEventListener("click", (e) => {
        const rect = modalDetalhes.getBoundingClientRect();
        if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
        ) {
            modalDetalhes.close();
        }
    });
}

// 5. Filtro interativo utilizando o método .filter()
if (filtroSetor) {
    filtroSetor.addEventListener("change", (e) => {
        const setorSelecionado = e.target.value;
        
        if (setorSelecionado === "todos") {
            renderizarEquipamentos(todosEquipamentos);
        } else {
            const filtrados = todosEquipamentos.filter(eq => eq.setor === setorSelecionado);
            renderizarEquipamentos(filtrados);
        }
    });
}

// Inicializa a carga dos dados ao carregar a página
carregarEquipamentos();