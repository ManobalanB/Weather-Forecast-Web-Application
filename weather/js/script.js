const apiKey = '287220775ce5c5d02e21065bef87c183'; 
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const locationDisplay = document.getElementById('location');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        alert('City not found. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

function fetchWeatherByLocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;
  const iconCode = weather[0].icon;

  weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${weather[0].description}">`;
  temperature.textContent = `${main.temp}°C`;
  weatherDescription.textContent = weather[0].description;
  locationDisplay.textContent = name;
  humidity.textContent = main.humidity;
  windSpeed.textContent = wind.speed;
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location.');
      }
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

searchBtn.addEventListener('click', () => {
  const city = locationInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name.');
  }
});

currentLocationBtn.addEventListener('click', getCurrentLocation);

// Fetch weather for a default city on page load
fetchWeather('London');