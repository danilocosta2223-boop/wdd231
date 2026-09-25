const apiKey = "SUA_CHAVE";
const city = "Sao Paulo";

async function getWeather() {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`
    );

    const data = await response.json();

    document.getElementById("weather-card").innerHTML = `
        <h3>${data.name}</h3>
        <p>🌡️ ${data.main.temp}°C</p>
        <p>${data.weather[0].description}</p>
    `;
}

getWeather();