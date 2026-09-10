// Script principal para a Página Inicial da Câmara de Comércio de São Paulo

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

    // 3. Integração com a API OpenWeather (São Paulo)
    // Insira a sua chave real entre aspas abaixo para ativar o clima e a previsão
    const apiKey = "SUA_CHAVE_REAL"; 
    const lat = -23.5505;
    const lon = -46.6333;
    
    const currentWeatherDiv = document.getElementById('current-weather');
    const forecastDiv = document.getElementById('forecast');

    if (currentWeatherDiv && forecastDiv && apiKey !== "SUA_CHAVE_REAL") {
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;

        // Clima Atual
        fetch(currentWeatherUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const temp = Math.round(data.main.temp);
                    const desc = data.weather[0].description;
                    const icon = data.weather[0].icon;
                    currentWeatherDiv.innerHTML = `
                        <h3>Clima Atual</h3>
                        <p class="current-weather-content">
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" class="weather-icon">
                            <strong>${temp}°C</strong>
                        </p>
                        <p class="weather-desc">${desc}</p>
                    `;
                } else {
                    currentWeatherDiv.innerHTML = `<p>Não foi possível carregar o clima atual.</p>`;
                }
            })
            .catch(() => {
                currentWeatherDiv.innerHTML = `<p>Erro ao conectar com o serviço de clima.</p>`;
            });

        // Previsão de 3 dias
        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === "200") {
                    const dailyList = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
                    let forecastHtml = `<h3>Previsão para 3 Dias</h3><div class="forecast-container">`;
                    
                    dailyList.forEach(day => {
                        const dateObj = new Date(day.dt * 1000);
                        const weekday = dateObj.toLocaleDateString('pt-BR', { weekday: 'short' });
                        const temp = Math.round(day.main.temp);
                        const icon = day.weather[0].icon;
                        const desc = day.weather[0].description;

                        forecastHtml += `
                            <div class="forecast-day">
                                <p><strong>${weekday}</strong></p>
                                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
                                <p>${temp}°C</p>
                            </div>
                        `;
                    });
                    forecastHtml += `</div>`;
                    forecastDiv.innerHTML = forecastHtml;
                } else {
                    forecastDiv.innerHTML = `<p>Não foi possível carregar a previsão.</p>`;
                }
            })
            .catch(() => {
                forecastDiv.innerHTML = `<p>Erro ao conectar com o serviço de previsão.</p>`;
            });
    } else if (currentWeatherDiv && forecastDiv) {
        currentWeatherDiv.innerHTML = `<p>Configure a chave da API do OpenWeather em home.js para visualizar o clima.</p>`;
        forecastDiv.innerHTML = `<p>Previsão indisponível sem chave de API.</p>`;
    }

    // 4. Carregamento de Empresas em Destaque (Spotlights - Exibindo 3 membros)
    const spotlightsContainer = document.getElementById('spotlights-container');
    if (spotlightsContainer) {
        fetch('data/membros.json')
            .then(response => response.json())
            .then(companies => {
                const featured = companies.filter(c => c.membership >= 2);
                const selected = featured.sort(() => 0.5 - Math.random()).slice(0, 3);

                let html = '';
                selected.forEach(comp => {
                    html += `
                        <div class="spotlight-card">
                            <img src="imagens/${comp.image}" alt="${comp.name}" class="spotlight-img">
                            <h3 class="spotlight-title">${comp.name}</h3>
                            <p class="spotlight-desc"><em>${comp.description}</em></p>
                            <p class="spotlight-contact">📞 ${comp.phone} | 🌐 <a href="${comp.website}" target="_blank">Site</a></p>
                        </div>
                    `;
                });
                spotlightsContainer.innerHTML = html;
            })
            .catch(() => {
                spotlightsContainer.innerHTML = `<p>Erro ao carregar as empresas em destaque.</p>`;
            });
    }
});