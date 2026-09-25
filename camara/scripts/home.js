document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Responsivo Mobile
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('animate-menu');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    // 2. Integração OpenWeather API (Clima Atual para São Paulo)
    const apiKey = "a8201b9b0b6c9d2d22678318510882d0";
    const city = "Sao Paulo";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;

    async function getWeather() {
        const weatherCard = document.getElementById("weather-card");
        if (!weatherCard) return;

        try {
            const response = await fetch(weatherUrl);
            if (!response.ok) {
                throw new Error('Falha ao obter dados meteorológicos');
            }
            const data = await response.json();

            // Arredondar a temperatura para inteiro para melhor visualização
            const temp = Math.round(data.main.temp);
            const description = data.weather[0].description;
            const capitalizedDesc = description.charAt(0).toUpperCase() + description.slice(1);

            weatherCard.innerHTML = `
                <h3>${data.name}</h3>
                <p style="font-size: 1.5rem; margin: 0.5rem 0;">🌡️ ${temp}°C</p>
                <p style="text-transform: capitalize;">${capitalizedDesc}</p>
            `;
        } catch (error) {
            console.error("Erro ao buscar clima:", error);
            weatherCard.innerHTML = `<p>Não foi possível carregar os dados do clima no momento.</p>`;
        }
    }

    getWeather();
});