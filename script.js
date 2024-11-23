const apiKey = 'b1a454602bf7074a03952a6cc9688df8';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=' + apiKey;

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log('Fetching weather data from:', url);

    fetch(url)
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(`Error: ${response.status} - ${err.message}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data received:', data);
            // Process and display the weather data
            locationElement.textContent = `${data.name}, ${data.sys.country}`;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Could not fetch weather data. Please check the city name and try again.');
        });
}