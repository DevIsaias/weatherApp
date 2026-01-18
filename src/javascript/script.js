document.querySelector("#search").addEventListener("submit", async (e) => {
  e.preventDefault();

  const cityName = document.querySelector("#city_name").value;

  if (!cityName) {
    return showAlertalert("Você precisa digitar uma cidade...");
  }

  const apiKey = "e6c7df8111e6ebfd3a08f1ca987af6e2";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    cityName
  )}&appid=${apiKey}&units=metric&lang=pt_br`;

  const results = await fetch(apiUrl);
  const json = await results.json();

  if (json.cod === 200) {
    showInfo({
      city: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      tempMax: json.main.temp_max,
      tempMin: json.main.temp_min,
      description: json.weather[0].description,
      tempIcon: json.weather[0].icon,
      windSpeed: json.wind.speed,
      humidity: json.main.humidity,
    });
  } else {
    showAlert("Não foi possivel localizar... Tente digitar novamente.");
  }
});

function showInfo(json) {
  showAlert("");

  document.querySelector("#weather").classList.add("show");

  //   Titulo
  document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`;

  //   Temperatura
  document.querySelector("#temp_value").innerHTML = `${json.temp.toFixed(
    0
  )} <sup>C°</sup>`;

  //   Descrição
  document.querySelector("#temp_desc").innerHTML = `${json.description}`;

  //   Imagem
  document
    .querySelector("#temp_img")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );

  // Temperatura Maxima
  document.querySelector("#temp_max").innerHTML = `${json.tempMax.toFixed(
    0
  )} <sup>C°</sup>`;

  // Temperatura Minima
  document.querySelector("#temp_min").innerHTML = `${json.tempMin.toFixed(
    0
  )} <sup>C°</sup>`;

  //   Humidade
  document.querySelector("#humidity").innerHTML = `${json.humidity}%`;

  //   Vento
  document.querySelector("#wind").innerHTML = `${json.windSpeed.toFixed(
    0
  )}km/h`;
}

function showAlert(msg) {
  document.querySelector("#alert").innerHTML = msg;
}
