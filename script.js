// Accessing elements
const cityInput = document.getElementById('cityInput');
const getWeatherButton = document.getElementById('getWeatherButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const errorElement = document.getElementById('error');

const apiKey = '19ba8ab464ff4579d588462c639c781e'; //OpenWeatherMap API Key

getWeatherButton.onclick = async () => {
  const city = cityInput.value.trim();
  if (!city) {
    errorElement.textContent = "Please enter a city name.";
    return;
  }

 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    // Check the city
    if (data.cod !== 200) {
      errorElement.textContent = `City not found: ${data.message}`;
      return;
    }

    // Display the weather data
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElement.textContent = `${data.main.temp.toFixed(1)}°C`;
    descriptionElement.textContent = data.weather[0].description;
    errorElement.textContent = '';  // Clear error message

  } catch (error) {
    errorElement.textContent = "Error fetching weather.";
  }
};
