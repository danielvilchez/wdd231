// ================= WEATHER.JS =================
const apiKey = "9046a56cf0ffdade1857a9070abc6713"; // Tu API Key
const lat = -12.0464;
const lon = -77.0428;
const units = 'metric'; // Celsius
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }

        const data = await response.json();
        displayCurrentWeather(data);
        displayForecast(data);
    } catch (error) {
        console.error(error);
        document.getElementById('current-weather').textContent = "Weather data not available.";
    }
}

// Mostrar clima actual
function displayCurrentWeather(data) {
    const current = data.list[0];
    const temp = Math.round(current.main.temp);
    const description = capitalizeFirstLetter(current.weather[0].description);

    document.getElementById('current-weather').innerHTML = `
        🌡️ <strong>Temperature:</strong> ${temp}°C<br>
        ☁️ <strong>Conditions:</strong> ${description}
    `;
}

// Mostrar pronóstico de 3 días
function displayForecast(data) {
    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = ''; // limpia primero

    const forecastDays = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    // Tomar solo los 3 primeros días
    forecastDays.slice(0, 3).forEach(day => {
        const date = new Date(day.dt_txt);
        const temp = Math.round(day.main.temp);
        const description = day.weather[0].description;

        const li = document.createElement('li');
        li.textContent = `${date.toLocaleDateString('en-US', { weekday: 'long' })}: ${temp}°C, ${description}`;

        forecastElement.appendChild(li);
    });
}

// Función helper para poner mayúscula inicial
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Llamar la función
getWeather();
