const apiKey = "c17065774883b5115ac515a1e6e75b28";

const searchButton = document.getElementById("searchButton");
const weatherResult = document.getElementById("weatherResult");
const cityInput = document.getElementById("cityInput");

if (!searchButton || !cityInput || !weatherResult) {
    console.error("Erro ao buscar dados. Cidade não encontrada ou chave de API inválida.")
}



searchButton.addEventListener("click", (evento) => {
  const cityName = cityInput.value.trim();
});
