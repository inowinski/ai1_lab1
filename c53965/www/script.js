
const API_KEY = '9688bea59ec187184b69a59dff5313aa';
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';


const weatherButton = document.getElementById('weather-button');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');


weatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchCurrentWeather(city);
        fetchForecast(city);
    } else {
        weatherResult.innerHTML = '<p>Proszę wprowadzić miasto!</p>';
    }
});


function fetchCurrentWeather(city) {
    const xhr = new XMLHttpRequest();
    const url = `${CURRENT_WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Odpowiedź z Current Weather API:', xhr.responseText);
            console.log('Status odpowiedzi z  Current Weather API:', xhr.status);
            const data = JSON.parse(xhr.responseText);
            displayCurrentWeather(data);
        } else {
            weatherResult.innerHTML += `<p>Nie udało się pobrać bieżącej pogody. Kod błędu: ${xhr.status}</p>`;
        }
    };
    xhr.send();
}


function fetchForecast(city) {
    const url = `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

    fetch(url)
        .then(response => {
            console.log('Status odpowiedzi z Forecast API:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            weatherResult.innerHTML += `<p>Nie udało się pobrać prognozy pogody: ${error.message}</p>`;
        });
}


function displayCurrentWeather(data) {
    const { name, main, weather } = data;
    const weatherInfo = `
    <div class = "pogoda"
        <h2>Bieżąca pogoda w ${name}:</h2>
        <p>Temperatura: ${main.temp}°C</p>
        <p>Opis: ${weather[0].description}</p>
        <p>Wilgotność: ${main.humidity}%</p>
        </div>
    `;
    weatherResult.innerHTML = weatherInfo;
}


function displayForecast(data) {
    const forecastItems = data.list.slice(0, 5).map(item => {
        const date = new Date(item.dt * 1000);
        return `
            <div class="pogoda">
                <p><strong>${date.toLocaleString('pl-PL')}</strong></p>
                <p>Temperatura: ${item.main.temp}°C</p>
                <p>Opis: ${item.weather[0].description}</p>
            </div>
        `;
    }).join('');

    const forecastInfo = `
        <h2>Prognoza na 5 dni:</h2>
        ${forecastItems}
    `;
    weatherResult.innerHTML += forecastInfo;
}
