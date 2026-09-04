const menuButton = document.querySelector('#menuButton');
const navMenu = document.querySelector('#navMenu');

if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuButton.classList.toggle('open');
        
        // Alterna o símbolo do botão entre ☰ e ✕ (opcional, mas melhora a UX)
        if (navMenu.classList.contains('open')) {
            menuButton.textContent = '✕';
        } else {
            menuButton.textContent = '☰';
        }
    });
}