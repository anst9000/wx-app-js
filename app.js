// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// Create handles for the elements in HTML
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

// The weather object used to store the data
const weather = {}

weather.temperature = {
  unit: "celcius"
}

const addEventListeners = () => {
  tempElement.addEventListener('click', changeDegreeScale)
}

const changeDegreeScale = () => {
  if (weather.temperature.unit === undefined) return

  if (weather.temperature.unit === "celcius") {
    let fahrenheit = convertToFahrenheit()
    tempElement.innerHTML = `${fahrenheit}° <span>F</span>`
    weather.temperature.unit = "fahrenheit"
  } else {
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`
    weather.temperature.unit = "celcius"
  }
}

const checkGeolocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition( setPosition, showError);
  } else {
    notificationElement.style.display = "block"
    notificationElement.innerHTML = `<p>Browser does not support geolocation</p>`
  }
}

const setPosition = (position) => {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude

  getWeather(latitude, longitude)
}

const getWeather = (latitude, longitude) => {
  const API_KEY = '6d823d1ca68116108a57a7bc3888caf4'
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`

  fetch(url, {})
    .then((res) => {
      let data = res.json()
      return data
    })
    .then((data) => {
      weather.temperature.value = Math.round(data.main.temp)
      weather.description = data.weather[0].description
      weather.iconId = data.weather[0].icon
      weather.city = data.name
      weather.country = data.sys.country
    })
    .then(() => {
      displayWeather()
    })
}

const showError = (error) => {
  notificationElement.style.display = "block"
  notificationElement.innerHTML = `<p>${error.message}</p>`
}

// Function to display the weather on screen
const displayWeather = () => {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png" />`;
  tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`
  descElement.innerHTML = `${weather.description}`
  locationElement.innerHTML = `${weather.city}, ${weather.country}`
}

const convertToFahrenheit = () => {
  return Math.round((weather.temperature.value * 9 / 5) + 32);
}

// The main function
const main = () => {
  window.removeEventListener('load', main);
  addEventListeners()
  checkGeolocation()
  // displayWeather()
}

window.addEventListener('load', main);