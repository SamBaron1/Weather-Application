
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "3cd9ac5ae2e77d78cbf9baffd30e037b"; // Replace with your actual API key

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch(error) {
            console.error(error);
            displayError("Could not fetch weather data");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiurl);

    if(!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather } = data;

    if (!weather || !weather[0]) {
        displayError("Weather data unavailable");
        return;
    }

    const { description, id } = weather[0];

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}℃`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return "⛈"; // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 400) {
        return "🌧"; // Drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
        return "🌧"; // Rain
    } else if (weatherId >= 600 && weatherId < 700) {
        return "❄"; // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
        return "🌪"; // Atmosphere
    } else if (weatherId === 800) {
        return "☀"; // Clear
    } else if (weatherId >= 801 && weatherId < 810) {
        return "☁"; // Clouds
    } else {
        return "❓"; // Unknown or other weather condition
    }
}


function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
