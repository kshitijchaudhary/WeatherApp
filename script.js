/*Name: Kshitij Chaudhary
    Student ID: c0920457
    Date: February 28, 2024
    Project Name: WeatherApp
*/
// DOM elements
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const loading = document.getElementById('loading');
const weatherInfo = document.getElementById('weatherInfo');

// Event listener for search button
searchBtn.addEventListener('click', handleSearch);

// Event listener for "Enter" key press in the input field
cityInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
        handleSearch();
    }
});

// Function to handle search
function handleSearch() {
    const cityName = cityInput.value;

    // Check if the trimmed value is empty or if it contains only spaces
    if (cityName.trim() === '' || /^\s+$/.test(cityName)) {
        console.error('Error: Enter a valid city name');
        showError('Please enter a valid city name');
        return;
    }
      // Check if weatherInfo container exists
      let weatherInfoContainer = document.getElementById('weatherInfo');

      if (!weatherInfoContainer) {
          // If it doesn't exist, create a new container
          weatherInfoContainer = document.createElement('div');
          weatherInfoContainer.id = 'weatherInfo';
          document.body.appendChild(weatherInfoContainer);
      }
  
      fetchWeather(cityName);
      showWeatherInfo();
  }

// Function to fetch weather data from API
function fetchWeather(city) {
    const apiKey = '36e531cd63cf50d29a9c575b5d3027a2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    loading.classList.remove('hidden');
    weatherInfo.innerHTML = '';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found. Please enter a valid city name.');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            setTheme(data);
        })
        .catch(error => {
            showError(error.message);
        })
        .finally(() => {
            loading.classList.add('hidden');
        });
}

// Function to display weather information
function displayWeather(data) {
    const weatherInfoContainer = document.getElementById('weatherInfo');
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    weatherInfoContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p class="temperature">${Math.round(data.main.temp)}°C</p>
        <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
        <p class="weather-description">${data.weather[0].description}</p>
        <p class="humidity">Humidity: ${data.main.humidity}%</p>
    `;
}

// Function to show error message
function showError(message) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<p class="error-msg">${message}</p>`;
    weatherInfo.classList.add('show'); 
}

// Function to set theme based on day or night
function setTheme(data) {
    const date = new Date();
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    const isDay = date >= sunrise && date < sunset;

    if (isDay) {
        setLightMode();
    } else {
        setDarkMode();
    }
}

// Function to set light mode
function setLightMode() {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
}

// Function to set dark mode
function setDarkMode() {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
}

// Function to show weather information
function showWeatherInfo() {
    const weatherInfoContainer = document.getElementById('weatherInfo');
    weatherInfoContainer.classList.add('show');
}
// Function to hide weather information
function hideWeatherInfo() {
    weatherInfo.classList.remove('show');
}
