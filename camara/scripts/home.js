const apiKey = "a8201b9b0b6c9d2d22678318510882d0";
const city = "Sao Paulo";

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;

async function getWeather() {
  try {
    // 1. Busca o clima atual
    const responseCurrent = await fetch(currentWeatherUrl);
    const dataCurrent = await responseCurrent.json();

    // 2. Busca a previsão de 5 dias / 3 em 3 horas
    const responseForecast = await fetch(forecastUrl);
    const dataForecast = await responseForecast.json();

    // Filtra para pegar a previsão do horário das 12:00 (meio-dia) nos próximos 3 dias
    const dailyForecasts = dataForecast.list
      .filter(item => item.dt_txt.includes("12:00:00"))
      .slice(0, 3);

    let forecastHtml = dailyForecasts.map(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
      return `
        <div class="forecast-day">
          <span><strong>${date}</strong></span>
          <span>🌡️ ${item.main.temp}°C</span>
          <span>${item.weather[0].description}</span>
        </div>
      `;
    }).join('');

    // Renderiza tudo no card
    document.getElementById("weather-card").innerHTML = `
      <div class="current-weather">
        <h3>📍 ${dataCurrent.name} (Agora)</h3>
        <p class="temp">🌡️ ${dataCurrent.main.temp}°C</p>
        <p class="desc">${dataCurrent.weather[0].description}</p>
      </div>
      <hr>
      <div class="forecast-container">
        <h4>Previsão para os próximos dias</h4>
        <div class="forecast-list">
          ${forecastHtml}
        </div>
      </div>
    `;

  } catch (error) {
    console.error("Erro ao buscar clima e previsão:", error);
    document.getElementById("weather-card").innerHTML = `<p>Não foi possível carregar os dados do clima.</p>`;
  }
}

getWeather();