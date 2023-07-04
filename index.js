function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDay];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let currentDay = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[currentDay];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecasting = document.querySelector("#forecasting");

  let forecastingHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastingHTML =
        forecastingHTML +
        `
      <div class="col-2">
      <div class="forecastDays"> ${formatDay(forecastDay.time)}</div>
      <img src="${forecastDay.condition.icon_url}" alt="" width="42" />
      <div class="forecastTemp">
        <span class="forecastTempMax">${Math.round(
          forecastDay.temperature.maximum
        )}°</span> <span class="forecastTempMin">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
      </div>
    </div>
  `;
    }
  });

  forecastingHTML = forecastingHTML + `</div>`;

  forecasting.innerHTML = forecastingHTML;
}

function getForecasting(coordinates) {
  let apiKey  =`407983bc8ab7f0ect5d0a9b4o05acb47`;;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  let cityName = document.querySelector(`#city-name`);
  let country = document.querySelector(`#country`);
  let tempfeels = document.querySelector(`#feels`);
  let humidity = document.querySelector(`#humidity`);
  let wind = document.querySelector(`#wind`);
  let description = document.querySelector(`#description`);
  let temperature = document.querySelector(`#temp-no`);
  let currentDate = document.querySelector("#current-date");
  let mainIcon = document.querySelector(`#main-icon`);

  cityName.innerHTML = response.data.city;
  country.innerHTML = response.data.country;
  cTemperature = response.data.temperature.current;
  temperature.innerHTML = Math.round(cTemperature);
  tempfeels.innerHTML = Math.round(response.data.temperature.feels_like);
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.condition.description;
  currentDate.innerHTML = formatDate(response.data.time * 1000);
  mainIcon.setAttribute("src", response.data.condition.icon_url);

  mainIcon.setAttribute("alt", response.data.condition.description);

  getForecasting(response.data.coordinates);
}

function showCity(city) {
  let units = `metric`;
  let apiKey = `407983bc8ab7f0ect5d0a9b4o05acb47`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  showCity(city);
}

function showPosition(position) {
  let apiKey =`407983bc8ab7f0ect5d0a9b4o05acb47`;
  let units = `metric`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function fLink(event) {
  event.preventDefault();
  linkCelsius.classList.remove(`active`);
  linkFahreheit.classList.add(`active`);
  let fTemperature = (cTemperature * 9) / 5 + 32;
  let temperature = document.querySelector(`#temp-no`);
  temperature.innerHTML = Math.round(fTemperature);
}

function cLink(event) {
  event.preventDefault();
  linkCelsius.classList.add(`active`);
  linkFahreheit.classList.remove(`active`);
  let temperature = document.querySelector("#temp-no");
  temperature.innerHTML = Math.round(cTemperature);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

let cTemperature = null;

let linkFahreheit = document.querySelector("#link-fahrenheit");
linkFahreheit.addEventListener(`click`, fLink);

let linkCelsius = document.querySelector("#link-celsius");
linkCelsius.addEventListener(`click`, cLink);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Abuja,Nigeria")
