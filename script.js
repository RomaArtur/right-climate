const apiKey = "c17065774883b5115ac515a1e6e75b28";

const searchButton = document.getElementById("searchButton");
const weatherResult = document.getElementById("weatherResult");
const cityInput = document.getElementById("cityInput");

if (!searchButton || !cityInput || !weatherResult) {
    console.error("Erro ao buscar dados. Cidade não encontrada ou chave de API inválida.")
}

searchButton.addEventListener("click", () => {
  const cityName = cityInput.value.trim(); 

  if (cityName) {
    getWeatherData(cityName);
  }
})
  function getWeatherData(city) {
    weatherResult.innerHTML = "<p>Buscando...</p>";

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
        throw new Error("Erro ao buscar dados. Cidade não encontrada ou chave API inválida.");
      }
      return response.json();
    }) 
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error("Houve um erro de requisição:", error);
      weatherResult.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`
    });
  }

  function displayWeather(data) {

    const temp = data.main.temp;
    const description = data.weather[0].description;
    const city = data.name;
    const country = data.sys.country;

    const formattedDescription = description.charAt(0).toUpperCase() + description.slice(1);

    const htmlContent = `
      <h2>${city}, ${country}</h2>
      <p>Temperatura: ${temp.toFixed(1)} graus Celcius</p>
      <p>Condição: ${formattedDescription}</p> 
    `;

    weatherResult.innerHTML = htmlContent;
  }

