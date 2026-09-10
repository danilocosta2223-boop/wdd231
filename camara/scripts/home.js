// Configuração correta do OpenWeather para S03 (Clima atual + Previsão de 3 dias)
const apiKey = "SUA_CHAVE_REAL_DO_OPENWEATHER"; // Substitua pela sua chave real
const lat = "-23.5505"; // Latitude (São Paulo)
const lon = "-46.6333"; // Longitude (São Paulo)

// URLs do OpenWeather (Clima Atual e Previsão de 5 dias/3 horas)
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=pt_br`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=pt_br`;

const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast');

// Função para buscar o clima atual
async function getCurrentWeather() {
    if (!currentWeatherDiv) return;
    try {
        const response = await fetch(currentWeatherUrl);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const data = await response.json();
        
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        
        currentWeatherDiv.innerHTML = `
            <div class="weather-card">
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
                <div>
                    <p><strong>${temp}°C</strong></p>
                    <p class="weather-desc">${description}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Erro ao buscar o clima atual:", error);
        currentWeatherDiv.innerHTML = "<p>Não foi possível carregar o clima atual.</p>";
    }
}

// Função para buscar a previsão de 3 dias (filtra 1 item por dia, ex: meio-dia)
async function getForecast() {
    if (!forecastDiv) return;
    try {
        const response = await fetch(forecastUrl);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const forecastData = await response.json();
        
        // Filtra os horários para pegar aproximadamente um por dia (ex: horário das 12:00)
        const dailyData = forecastData.list
            .filter(item => item.dt_txt.includes("12:00:00"))
            .slice(0, 3);
        
        let forecastHTML = '<div class="forecast-container">';
        
        dailyData.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('pt-BR', {
                weekday: 'short'
            });
            
            const tempMax = Math.round(day.main.temp_max);
            const tempMin = Math.round(day.main.temp_min);
            const icon = day.weather[0].icon;
            const desc = day.weather[0].description;
            
            forecastHTML += `
                <div class="forecast-card">
                    <p><strong>${dayName}</strong></p>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
                    <p>${tempMax}°C / ${tempMin}°C</p>
                </div>
            `;
        });
        
        forecastHTML += '</div>';
        forecastDiv.innerHTML = forecastHTML;
        
    } catch (error) {
        console.error("Erro ao buscar a previsão:", error);
        forecastDiv.innerHTML = "<p>Não foi possível carregar a previsão do tempo.</p>";
    }
}

// Inicializa as chamadas
getCurrentWeather();
getForecast();