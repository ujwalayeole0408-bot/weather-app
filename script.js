const apiKey = "09a7b85453515091edd1ae4b97f70b6e";

async function getWeather() {

    const city = document.getElementById("city").value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    document.getElementById("loader").style.display = "block";
    document.getElementById("error").textContent = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        document.getElementById("loader").style.display = "none";

        if (data.cod != 200) {
            document.getElementById("error").textContent = data.message;
            return;
        }

        document.getElementById("cityName").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temp").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("icon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("humidity").textContent =
            data.main.humidity + "%";

        document.getElementById("wind").textContent =
            data.wind.speed + " m/s";

        document.getElementById("feels").textContent =
            data.main.feels_like + "°C";

        document.getElementById("pressure").textContent =
            data.main.pressure + " hPa";

        document.getElementById("max").textContent =
            data.main.temp_max + "°C";

        document.getElementById("min").textContent =
            data.main.temp_min + "°C";
       
const sunrise = new Date(data.sys.sunrise * 1000);
const sunset = new Date(data.sys.sunset * 1000);

document.getElementById("sunrise").textContent =
    sunrise.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

document.getElementById("sunset").textContent =
    sunset.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    } catch (error) {

        document.getElementById("loader").style.display = "none";
        document.getElementById("error").textContent =
            "Unable to fetch weather.";

        console.error(error);
    }

}

// Search when Enter key is pressed
document.getElementById("city").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getWeather();
    }
});
const darkBtn = document.getElementById("darkBtn");

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        darkBtn.innerHTML="☀️ Light Mode";
    }
    else{
        darkBtn.innerHTML="🌙 Dark Mode";
    }

});