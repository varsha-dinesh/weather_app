const notificationElement = document.querySelector(".notification")
const iconElement = document.querySelector(".weather-icon")
const tempElement = document.querySelector(".temperature-value")
const descElement = document.querySelector(".temperature-description p")
const locationElement = document.querySelector(".location p")

console.log(tempElement.innerHTML)

//App data

const weather = {};

weather.temperature = {
    unit: "celsius"
}

console.log(weather)

//const and let

const kelvin = 273
const key = "82005d27a116c2880c8f0fcb866998a0"

//check if brower support geolocation


if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Brower doesn't support Geolocation</p>"
}

//user's position

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    console.log(latitude)

    getWeather(latitude, longitude)
}

//show error when there is an issue

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`
}

//get weather from api

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

    fetch(api)
        .then(function (response) {
            console.log(response)
            let data = response.json();
            console.log(data)
            return data

        })
        .then(function (data) {
            console.log(data)
            weather.temperature.value = Math.floor(data.main.temp - kelvin)
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather()
        })
}

function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png">`
    tempElement.innerHTML = `<p>${weather.temperature.value}&#176 <span>C</span></p>`
    descElement.innerHTML = `${weather.description}`
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}

//convert c to f

function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;

}

tempElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit === "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value)
        fahrenheit = Math.floor(fahrenheit)

        tempElement.innerHTML = `${fahrenheit}&#176 <span>F</span>`
        weather.temperature.unit = "fahrenheit"
    } else {
        tempElement.innerHTML = `<p>${weather.temperature.value}&#176 <span>C</span></p>`
        weather.temperature.unit = "celsius"


    }
})
