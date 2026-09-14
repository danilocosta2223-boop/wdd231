// ==========================================
// 1. Configuração do Rodapé (Datas)
// ==========================================
const currentYearEl = document.getElementById("currentyear");
const lastModifiedEl = document.getElementById("lastModified");

if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}
if (lastModifiedEl) {
    lastModifiedEl.textContent = `Última Modificação: ${document.lastModified}`;
}

// ==========================================
// 2. Clima e Previsão de 3 Dias (OpenWeather)
// ==========================================
// Substitua o valor entre aspas abaixo pela sua chave de 32 caracteres do OpenWeather:
const apiKey = 'SUA_CHAVE_REAL_AQUI'; 
const lat = '-23.5505';
const lon = '-46.6333';

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const responseCurrent = await fetch(currentWeatherUrl);
        if (responseCurrent.ok) {
            const dataCurrent = await responseCurrent.json();
            displayCurrentWeather(dataCurrent);
        }

        const responseForecast = await fetch(forecastUrl);
        if (responseForecast.ok) {
            const dataForecast = await responseForecast.json();
            displayForecast(dataForecast);
        }
    } catch (error) {
        console.error('Erro ao buscar dados do clima:', error);
    }
}

function displayCurrentWeather(data) {
    const tempElement = document.getElementById('current-temp');
    const descElement = document.getElementById('weather-desc');

    if (tempElement && descElement) {
        tempElement.innerHTML = `<strong>${Math.round(data.main.temp)}°C</strong>`;
        const desc = data.weather[0].description;
        descElement.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    if (!forecastContainer) return;

    forecastContainer.innerHTML = '<h3>Previsão para 3 Dias</h3>';

    // Filtra medições das 12:00 dos próximos 3 dias
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-day');
        forecastCard.innerHTML = `
            <p><strong>${dayName.toUpperCase()}</strong>: ${Math.round(day.main.temp)}°C - ${day.weather[0].description}</p>
        `;
        forecastContainer.appendChild(forecastCard);
    });
}

fetchWeather();

// ==========================================
// 3. Empresas em Destaque - Spotlights (Gold/Silver)
// ==========================================
const membersUrl = 'dados/membros.json';

async function fetchSpotlightMembers() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();
            displaySpotlights(members);
        }
    } catch (error) {
        console.error('Erro ao buscar membros:', error);
    }
}

function displaySpotlights(members) {
    const spotlightsContainer = document.getElementById('spotlights-container');
    if (!spotlightsContainer) return;

    // Filtra membros qualificados (Ouro e Prata)
    const qualifiedMembers = members.filter(member => {
        const nivel = member.nivel || member.membershipLevel;
        return nivel === 'Ouro' || nivel === 'Prata' || nivel === 2 || nivel === 3 || nivel === 'Gold' || nivel === 'Silver';
    });

    // Sorteia de 2 a 3 empresas aleatórias
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selectedSpotlights = shuffled.slice(0, 3);

    spotlightsContainer.innerHTML = '';

    selectedSpotlights.forEach(member => {
        const card = document.createElement('article');
        card.classList.add('spotlight-card');

        card.innerHTML = `
            <h3>${member.nome}</h3>
            <img src="imagens/${member.imagem}" alt="Logo de ${member.nome}" loading="lazy" width="120" height="80">
            <p><strong>Telefone:</strong> ${member.telefone}</p>
            <p><strong>Endereço:</strong> ${member.endereco}</p>
            <p class="membership-badge">Membro ${member.nivel || 'Destaque'}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Visitar Website</a>
        `;

        spotlightsContainer.appendChild(card);
    });
}

fetchSpotlightMembers();