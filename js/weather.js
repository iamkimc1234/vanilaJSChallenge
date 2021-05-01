const weather = document.querySelector("#weather");
const weather2 = document.querySelector("#weather2");
const elDayIcon = document.querySelector("#wIcon");

const COORDS = "coords";
const API_KEY = "7ef6c8bded9d146e91177768feb660f0";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then((res) => {
    return res.json();
  }).then((result) => {
    const temp_max = result.main.temp_max;
    const temp_min = result.main.temp_min;
    const place = result.name;
    weather.innerText = `${place} `;
    weather2.innerText = `Max: ${temp_max}° Min: ${temp_min}°`;
    const icoSrc = `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
    elDayIcon.src = icoSrc;
  });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log('error in GEO');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }

}

function init() {
  loadCoords();
}

init();