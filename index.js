const locURL = "https://ipapi.co/json/";
const nameEl = document.querySelector("#name");
const descriptionEl = document.querySelector("#description");
const tempEl = document.querySelector("#temp");
const iconEl = document.querySelector("#icon");

const state = {
  weather: []
};

const getWeatherData = fetch(locURL, {
  method: "get"
})
  .then(response => {
    return response.json();
  })
  .then(data => {
    const city = data.city;
    const region = data.region;

    return fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${region}&appid=d62404bf337924b5cf2cb59a327d0e7c`
    );
  })
  .then(response => {
    return response.json();
  })
  .then(weather => {
    state.weather = weather;
    weatherInfo();
  });

const weatherInfo = () => {
  const name = state.weather.name;
  const description = state.weather.weather[0].description;
  const temp = parseInt(state.weather.main.temp - 273.15);
  const icon = state.weather.weather[0].icon;

  nameEl.innerHTML = `<strong>${name}</strong>`;
  descriptionEl.innerHTML = `${description}`;
  tempEl.innerHTML = `${temp}&#8451`;
  iconEl.innerHTML = `<img src=\"https://openweathermap.org/img/wn/${icon}@2x.png\ ">`;
};
