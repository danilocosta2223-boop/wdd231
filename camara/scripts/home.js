document.addEventListener("DOMContentLoaded", () => {
    // 1. Destaques de Empresas (Spotlights)
    const spotlightsContainer = document.querySelector("#spotlights-grid");

    const getSpotlights = async () => {
        try {
            const response = await fetch("./dados/membros.json");

            if (!response.ok) {
                throw new Error("Erro ao carregar membros.json");
            }

            const members = await response.json();

            // Filtra membros com nível 2 ou superior (Prata/Ouro) usando o valor numérico
            const premiumMembers = members.filter(member => member.nivel >= 2);

            // Embaralha aleatoriamente e pega 3 empresas
            const shuffled = premiumMembers.sort(() => 0.5 - Math.random());
            const spotlight = shuffled.slice(0, 3);

            if (spotlightsContainer) {
                spotlightsContainer.innerHTML = "";
                spotlight.forEach(member => {
                    spotlightsContainer.innerHTML += `
                        <div class="spotlight-card">
                            <img src="imagens/${member.imagem}" alt="Logo de ${member.nome}" loading="lazy">
                            <h3>${member.nome}</h3>
                            <p><strong>Telefone:</strong> ${member.telefone}</p>
                            <p><strong>Endereço:</strong> ${member.endereco}</p>
                            <p><strong>Nível:</strong> Nível ${member.nivel}</p>
                            <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="cta-button">Visitar Website</a>
                        </div>
                    `;
                });
            }
        } catch (error) {
            console.error("Erro ao carregar empresas em destaque:", error);
        }
    };

    getSpotlights();

    // 2. Seção de Clima (OpenWeatherMap)
    const apiKey = "a8201b9b0b6c9d2d22678318510882d0"; // Nova chave atualizada
    const lat = "-23.5505"; // Coordenadas de São Paulo
    const lon = "-46.6333";

    const weatherCard = document.querySelector("#weather-card");
    const forecastContainer = document.querySelector("#forecast-container");

    const getWeather = async () => {
        try {
            // URL para o clima atual com o & puro
            const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;
            console.log("Current URL:", currentUrl);

            const currentResponse = await fetch(currentUrl);
            console.log("Current Status:", currentResponse.status);

            if (!currentResponse.ok) throw new Error(`Erro ${currentResponse.status} ao buscar dados de clima atual`);
            const currentData = await currentResponse.json();

            const temp = Math.round(currentData.main.temp);
            const description = currentData.weather[0].description;
            const capitalizedDesc = description.charAt(0).toUpperCase() + description.slice(1);
            const icon = currentData.weather[0].icon;

            if (weatherCard) {
                weatherCard.innerHTML = `
                    <div class="current-weather">
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
                        <div>
                            <h3>${temp}°C</h3>
                            <p>${capitalizedDesc}</p>
                        </div>
                    </div>
                `;
            }

            // URL para a previsão de 5 dias / 3 horas com o & puro
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;
            console.log("Forecast URL:", forecastUrl);

            const forecastResponse = await fetch(forecastUrl);
            console.log("Forecast Status:", forecastResponse.status);

            if (!forecastResponse.ok) throw new Error(`Erro ${forecastResponse.status} ao buscar dados de previsão`);
            const forecastData = await forecastResponse.json();

            // Filtra os dados para pegar uma medição por dia (às 12:00) pegando os próximos 3 dias
            const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

            if (forecastContainer) {
                forecastContainer.innerHTML = "<h4>Previsão para os Próximos Dias</h4>";

                dailyForecasts.forEach(dayData => {
                    const date = new Date(dayData.dt * 1000);
                    const dayName = date.toLocaleDateString("pt-BR", { weekday: 'short' });
                    const dayTemp = Math.round(dayData.main.temp);
                    const dayDesc = dayData.weather[0].description;
                    const dayIcon = dayData.weather[0].icon;

                    forecastContainer.innerHTML += `
                        <div class="forecast-day">
                            <p><strong>${dayName}</strong></p>
                            <img src="https://openweathermap.org/img/wn/${dayIcon}.png" alt="${dayDesc}">
                            <p>${dayTemp}°C</p>
                        </div>
                    `;
                });
            }

        } catch (error) {
            console.error("Erro ao carregar o clima:", error);
            if (weatherCard) {
                weatherCard.innerHTML = `<p style="color: #d9534f;">Não foi possível carregar as informações do clima. Verifique a chave da API.</p>`;
            }
        }
    };

    getWeather();

    // 3. Rodapé dinâmico
    const currentYearSpan = document.querySelector("#currentYear");
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    const lastModifiedSpan = document.querySelector("#lastModified");
    if (lastModifiedSpan) lastModifiedSpan.textContent = `Última Modificação: ${document.lastModified}`;
});