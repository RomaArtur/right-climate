const weatherApiKey = "c17065774883b5115ac515a1e6e75b28";

const searchButton = document.getElementById("searchButton");
const weatherResult = document.getElementById("weatherResult");
const cityInput = document.getElementById("cityInput");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  if (isDark) {
    themeIcon.innerHTML =
      '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  } else {
    themeIcon.innerHTML =
      '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
  }
}

themeToggle.addEventListener("click", toggleTheme);

function handleSearch() {
  const cityName = cityInput.value.trim();
  if (cityName) {
    getWeatherData(cityName);
    cityInput.value = "";
    cityInput.blur();
  }
}

searchButton.addEventListener("click", handleSearch);

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

function getWeatherData(city) {
  weatherResult.innerHTML = '<div class="loading-spinner"></div>';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric&lang=pt_br`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Cidade não encontrada");
      return response.json();
    })
    .then((data) => displayWeather(data))
    .catch((error) => {
      console.error("Erro:", error);
      weatherResult.innerHTML = `<div class="error-box">⚠️ ${error.message}</div>`;
    });
}

function getFlaticonStyleIcon(code) {
  const iconMap = {
    "01d": "clear-day",
    "01n": "clear-night",
    "02d": "partly-cloudy-day",
    "02n": "partly-cloudy-night",
    "03d": "cloudy",
    "03n": "cloudy",
    "04d": "overcast",
    "04n": "overcast",
    "09d": "rain",
    "09n": "rain",
    "10d": "partly-cloudy-day-rain",
    "10n": "partly-cloudy-night-rain",
    "11d": "thunderstorms",
    "11n": "thunderstorms-night",
    "13d": "snow",
    "13n": "snow",
    "50d": "mist",
    "50n": "mist",
  };

  const iconName = iconMap[code] || "not-available";
  return `https://cdn.jsdelivr.net/gh/basmilius/weather-icons@latest/production/fill/all/${iconName}.svg`;
}

function displayWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const city = data.name;
  const country = data.sys.country;
  const iconCode = data.weather[0].icon;

  const iconUrl = getFlaticonStyleIcon(iconCode);
  const fallbackUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  const flagUrl = `https://flagsapi.com/${country}/flat/64.png`;

  const iconClass =
    iconCode === "01d" ? "weather-icon rotating-sun" : "weather-icon";

  const htmlContent = `
      <div class="weather-card">
        <h2 class="city-name">
            ${city} 
            <img src="${flagUrl}" alt="${country}" class="country-flag" />
        </h2>
        
        <div class="main-weather">
            <img 
              src="${iconUrl}" 
              alt="${description}" 
              class="${iconClass}"
              onerror="this.src='${fallbackUrl}'"
            >
            <p class="temperature">${temp}°</p>
        </div>
        
        <p class="condition-text">${description}</p> 
      </div>
    `;

  weatherResult.innerHTML = htmlContent;
}
