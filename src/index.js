let Datenow = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[Datenow.getDay()];
let hour = Datenow.getHours();
let Minutes = Datenow.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (Minutes < 10) {
  Minutes = `0${Minutes}`;
}
let showtoday = document.querySelector("#today");
showtoday.innerHTML = `${day} ${hour}:${Minutes}`;

function infoWeather(response) {
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function changeCity(city) {
  let apiKey = "c7699193d293035651e73a0adb1b4454";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(infoWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  changeCity(city);
}

function searchLocation(position) {
  let apiKey = "c7699193d293035651e73a0adb1b4454";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(infoWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showTempToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = 19;
}
function showTempToFahrenheit(event) {
  event.preventDefault();

  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = 66;
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

changeCity("New York");
