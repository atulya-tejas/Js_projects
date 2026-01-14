//domLoad
document.addEventListener('DOMContentLoaded',() => {
    //Elements
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityNameDisplay  = document.getElementById('city-name');
    const temperatureDisplay   = document.getElementById('temprature');
    const descriptionDisplay = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');

    const APIKey = `035a35a871eb20319bdddd7a365a51ee`;
     
    getWeatherBtn.addEventListener('click', async() => {
        const city = cityInput.value.trim();
        if(!city) return ;

        try{
            const cityWeather = await fetchWeatherData(city);
            displayWeatherData(cityWeather);
        } catch (error) {
            console.error(error)
            showError();
        }
    });

    async function fetchWeatherData(city){
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

            const response = await fetch(url);
            if(!response.ok){
                throw new Error(`City not found`)
            };
            const data = await response.json()
            return data ;
    }

    function displayWeatherData(data){
        const {name , main ,weather} = data;

        cityNameDisplay.textContent= name;
        temperatureDisplay.textContent = `Temprature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden")
    }

    function showError (){
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden")
    }












})