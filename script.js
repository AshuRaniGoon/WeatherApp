document.addEventListener("DOMContentLoaded", function() {
    window.fetchWeather = async function() {
        const city = document.getElementById("cityInput").value;
        const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            const weatherCard = document.getElementById("weatherCard");
            const errorElem = document.getElementById("error");
            
            if (response.ok) {
                errorElem.textContent = "";
                weatherCard.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Condition: ${data.weather[0].description}</p>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
                `;
            } else {
                weatherCard.innerHTML = "";
                errorElem.textContent = data.message;
            }
        } catch (error) {
            document.getElementById("error").textContent = "Failed to fetch weather data";
        }
    }
});