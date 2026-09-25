document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('animate-menu');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
        });
    }
});