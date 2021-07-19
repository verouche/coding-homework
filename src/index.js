let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let time = now.getHours();
if (time < 10) {
  time = `0${time}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let h4 = document.querySelector("h4");
h4.innerHTML = `${day} ${time}:${minute}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityHeading = document.querySelector("h1");

  if (searchInput.value < 1) {
    cityHeading.innerHTML = "Enter city above";
  } else {
    cityHeading.innerHTML = `${searchInput.value}`;
  }
  let apiKey = "8f3413157014eed90a1e4054263b7086";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  let currentTemperature = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}°C`;
  console.log(temperature);
}

let currentLocationIcon = document.querySelector("#currentLocation");
currentLocationIcon.addEventListener("click", displayLocalTemperature);
function displayLocalTemperature(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "8f3413157014eed90a1e4054263b7086";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperatureLocation);
    function showTemperatureLocation(response) {
      let cityHeading = document.querySelector("h1");
      cityHeading.innerHTML = response.data.name;
      let temperature = document.querySelector("h2");
      let currentTemp = Math.round(response.data.main.temp);
      temperature.innerHTML = `${currentTemp}°C`;
    }
  }
}
