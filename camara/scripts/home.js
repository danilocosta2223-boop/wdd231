// Configuração do Menu Responsivo e Rodapé Dinâmico
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");

if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        menuButton.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
    });
}

const currentYearElement = document.querySelector("#currentYear");
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

const lastModifiedElement = document.querySelector("#lastModified");
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Última Modificação: ${document.lastModified}`;
}

// ----------------------------------------------------
// INTEGRAÇÃO COM OPENWEATHER API (Clima Atual + Previsão)
// ----------------------------------------------------
// LEMBRE-SE: Insira aqui a sua chave real da OpenWeather para o clima funcionar na auditoria!
const apiKey = "SUA_CHAVE_API_OPENWEATHER"; 
const lat = -23.5505; // São Paulo
const lon = -46.6333;

const currentWeatherDiv = document.querySelector("#current-weather");
const forecastDiv = document.querySelector("#forecast");

async function getWeather() {
    try {
        // Clima Atual
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error("Erro ao buscar dados do clima.");
        const data = await response.json();

        displayCurrentWeather(data);

        // Previsão (Forecast - 3 dias)
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) throw new Error("Erro ao buscar previsão.");
        const forecastData = await forecastResponse.json();

        displayForecast(forecastData);

    } catch (error) {
        console.error("Erro no clima:", error);
        if (currentWeatherDiv) {
            currentWeatherDiv.innerHTML = `<p>Não foi possível carregar os dados meteorológicos no momento. Verifique sua chave da API.</p>`;
        }
    }
}

function displayCurrentWeather(data) {
    if (!currentWeatherDiv) return;
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    currentWeatherDiv.innerHTML = `
        <div class="weather-current-card">
            <img src="${iconUrl}" alt="${desc}">
            <div>
                <p class="temp"><strong>${temp}°C</strong></p>
                <p class="weather-desc">${desc}</p>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    if (!forecastDiv) return;
    
    // Filtrar dados para pegar aproximação de 3 dias (meio-dia)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    let forecastHTML = "<h3>Previsão para os Próximos 3 Dias</h3><div class='forecast-list'>";
    
    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString("pt-BR", { weekday: 'short', day: 'numeric', month: 'numeric' });
        const temp = Math.round(day.main.temp);
        const desc = day.weather[0].description;
        const icon = day.weather[0].icon;

        forecastHTML += `
            <div class="forecast-item">
                <p><strong>${date}</strong></p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
                <p>${temp}°C</p>
                <p class="forecast-desc">${desc}</p>
            </div>
        `;
    });
    
    forecastHTML += "</div>";
    forecastDiv.innerHTML = forecastHTML;
}

// ----------------------------------------------------
// DESTAQUES DE EMPRESAS (Spotlights - Nível 2 ou 3)
// ----------------------------------------------------
const spotlightsContainer = document.querySelector("#spotlights-container");
const membersUrl = "data/membros.json";

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error("Erro ao carregar membros.");
        const members = await response.json();

        // Filtrar apenas membros de nível 2 (Prata) ou 3 (Ouro)
        const filtered = members.filter(m => m.membership === 2 || m.membership === 3);

        // Selecionar aleatoriamente 3 empresas
        const featured = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

        displaySpotlights(featured);
    } catch (error) {
        console.error("Erro nos destaques:", error);
    }
}

function displaySpotlights(members) {
    if (!spotlightsContainer) return;
    spotlightsContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        let levelText = member.membership === 3 ? "Membro Ouro" : "Membro Prata";

        card.innerHTML = `
            <img src="imagens/${member.image}" alt="Logo de ${member.name}" loading="lazy">
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="tagline">${member.description}</p>
                <p><strong>Endereço:</strong> ${member.address}</p>
                <p><strong>Telefone:</strong> ${member.phone}</p>
                <p><strong>Nível:</strong> ${levelText}</p>
                <a href="${member.website}" target="_blank" rel="noopener">Visitar Website</a>
            </div>
        `;

        spotlightsContainer.appendChild(card);
    });
}

// Executar funções principais
getWeather();
getSpotlights();