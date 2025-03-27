const weatherForm = document.querySelector("#form");
const weatherInput = document.querySelector("#input");
const weatherWrapper = document.querySelector("#box");

const APIkey = "8e130fb9aa7c9c66f27a338631d013d3";

async function renderCity(event) {
    event.preventDefault(); // Предотвращает перезагрузку страницы

    const inputValue = weatherInput.value.trim();

    if (!inputValue) {
        alert("Please enter a city name");
        return;
    }

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${APIkey}&units=metric`);
        const data = await res.json();

        if (res.ok) {
            // Преобразуем время UNIX в обычный формат
            const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

            weatherWrapper.innerHTML = `
            <div class="card">
                <h2 class="text-xl font-bold">City: ${data.name}</h2>
                <h3 class="text-lg">Temperature: ${Math.round(data.main.temp)}°C</h3>
                <h3 class="text-lg">Description: ${data.weather[0].description}</h3>
                <h3 class="text-lg">Sunrise: ${sunriseTime}</h3>
                <h3 class="text-lg">Sunset: ${sunsetTime}</h3>
                <iframe
  width="380"
  height="244"
  style="border:0"
  loading="lazy"
  allowfullscreen
  referrerpolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps?q=${data.coord.lat},${data.coord.lon}&output=embed">
</iframe>
            </div>
            `;
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch weather data. Please try again.");
    }
}

weatherForm.addEventListener("submit", renderCity);
