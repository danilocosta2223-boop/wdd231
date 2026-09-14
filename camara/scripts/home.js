document.addEventListener("DOMContentLoaded", () => {
    // 1. Atualizar o ano atual e a última modificação no rodapé
    const currentYearSpan = document.getElementById("currentYear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedP = document.getElementById("lastModified");
    if (lastModifiedP) {
        lastModifiedP.textContent = `Última modificação: ${document.lastModified}`;
    }

    // 2. Configurações da API do OpenWeather (São Paulo - SP)
    const apiKey = "679f2252c1e406f52e50529d2fba3d52"; // Chave real configurada
    const city = "Sao Paulo";
    const units = "metric";
    const lang = "pt_br";

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&lang=${lang}&appid=${apiKey}`;

    // Buscar Clima Atual
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("current-weather");
            if (container && data.cod === 200) {
                const temp = Math.round(data.main.temp);
                const desc = data.weather[0].description;
                const icon = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                container.innerHTML = `
                    <div class="weather-card">
                        <img src="${iconUrl}" alt="${desc}">
                        <div>
                            <p><strong>${temp}°C</strong></p>
                            <p class="weather-desc">${desc}</p>
                        </div>
                    </div>
                `;
            } else if (container) {
                container.innerHTML = "<p>Não foi possível carregar o clima atual.</p>";
            }
        })
        .catch(error => {
            console.error("Erro ao buscar clima atual:", error);
        });

    // Buscar Previsão do Tempo
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("forecast");
            if (container && data.cod === "200") {
                const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));
                
                let forecastHTML = '<div class="forecast-container">';
                dailyForecasts.slice(0, 3).forEach(day => {
                    const date = new Date(day.dt * 1000).toLocaleDateString("pt-BR", { weekday: 'short', day: 'numeric', month: 'numeric' });
                    const temp = Math.round(day.main.temp);
                    const desc = day.weather[0].description;
                    const icon = day.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

                    forecastHTML += `
                        <div class="forecast-card">
                            <p><strong>${date}</strong></p>
                            <img src="${iconUrl}" alt="${desc}">
                            <p>${temp}°C</p>
                            <p class="weather-desc">${desc}</p>
                        </div>
                    `;
                });
                forecastHTML += '</div>';
                container.innerHTML = forecastHTML;
            } else if (container) {
                container.innerHTML = "<p>Não foi possível carregar a previsão.</p>";
            }
        })
        .catch(error => {
            console.error("Erro ao buscar previsão:", error);
        });

    // 3. Carregar Empresas em Destaque (Spotlights) usando 'membros.json' e compatível com a propriedade 'membership'
    const spotlightsContainer = document.getElementById("spotlights-container");
    if (spotlightsContainer) {
        fetch("data/membros.json")
            .then(response => {
                if (!response.ok) throw new Error("Arquivo de membros não encontrado");
                return response.json();
            })
            .then(members => {
                // Compatibilidade garantida checando tanto 'membership' quanto 'membershipLevel'
                const spotlights = members.filter(m => (m.membership !== undefined ? m.membership : m.membershipLevel) >= 2);
                const selected = spotlights.sort(() => 0.5 - Math.random()).slice(0, 2);

                let html = '<div class="spotlights-grid">';
                selected.forEach(company => {
                    html += `
                        <div class="spotlight-card">
                            <img src="imagens/${company.image}" alt="${company.name}">
                            <h3>${company.name}</h3>
                            <p>${company.address}</p>
                            <p>${company.phone}</p>
                            <a href="${company.website}" target="_blank">Visitar site</a>
                        </div>
                    `;
                });
                html += '</div>';
                spotlightsContainer.innerHTML = html;
            })
            .catch(() => {
                spotlightsContainer.innerHTML = `
                    <div class="spotlight-fallback">
                        <div class="spotlight-fallback-card">
                            <h3>Comércio & Tecnologia SP</h3>
                            <p>Soluções corporativas e inovação para o mercado paulista.</p>
                        </div>
                        <div class="spotlight-fallback-card">
                            <h3>Indústria Paulista S.A.</h3>
                            <p>Excelência em logística e comércio exterior.</p>
                        </div>
                    </div>
                `;
            });
    }
});