//defining page time and date

let actualDate = new Date();

    //Time format
    let actualHour = ("0" + actualDate.getHours()).slice(-2);

    let actualMinutes = ("0" + actualDate.getMinutes()).slice(-2);

    let headerTime = document.querySelector("#headerTime")

    headerTime.innerHTML = `${actualHour}h${actualMinutes}min`

    //Date format
    let weekDays = ["Sunday", "Monday", "Teusday", "Wednsday", "Thursday", "Friday", "Saturday"]

    let weekDay = weekDays[actualDate.getDay()]

    let months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    let actualMonth = months[actualDate.getMonth()];

    let today = ("0" + actualDate.getDate()).slice(-2);

    let actualYear = actualDate.getFullYear();

    let headerDate = document.querySelector("#headerDate"); 

    headerDate.innerHTML = `${weekDay}, ${actualMonth} ${today}, ${actualYear}`;

   
    //Get actual weather and location (when user allows the browser to get location on page load)
    
    function myLocation(event){
        navigator.geolocation.getCurrentPosition(getPosition);
    
    }

    myLocation()

    function getPosition(position) {
        let endPoint = `https://api.openweathermap.org/data/2.5/weather?`;
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let units = `metric`;
        let apiKey = "688018bb7f107c9335eff97b45fc2591";
        let apiUrl = `${endPoint}lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
        axios.get(apiUrl).then(showWeather);

      }
    
    //Show location from text-box

let formInput = document.querySelector("#frloc");
formInput.addEventListener("submit",readLocation);


function readLocation(event){
    event.preventDefault();
    let location = document.querySelector("#formlocation").value;
    displayLocation(location);

    
}

function displayLocation (location){
    let endPoint = `https://api.openweathermap.org/data/2.5/weather?`;
    let units = `metric`;
    let apiKey = "688018bb7f107c9335eff97b45fc2591";
    locationUrl = `${endPoint}q=${location}&units=${units}&appid=${apiKey}`;
    axios.get(locationUrl).then(showWeather);
    
}

function formatDate(timestamp){

    let lastUpdate = new Date(timestamp)

    //Time format
    let updateHour = ("0" + lastUpdate.getHours()).slice(-2);
    let updateMinutes = ("0" + lastUpdate.getMinutes()).slice(-2);

    //Date format
    
    let updateMonth = ("0" + (lastUpdate.getMonth()+1));
    let updateDay = ("0" + lastUpdate.getDate()).slice(-2);
    let updateYear = (lastUpdate.getYear())-100;
    

    return `last updated on <br>${updateDay}/${updateMonth}/${updateYear} at ${updateHour}:${updateMinutes}`
}

    function showWeather(response) {
        let temperature = Math.round(response.data.main.temp);
        let city = response.data.name;
        let description = response.data.weather[0].description;
        let humidity = response.data.main.humidity;
        let windspeed = Math.round(response.data.wind.speed*3600/1000); //convert m/s to km/h
        let weather_icon = response.data.weather[0].icon;

        let actualLocation= document.querySelector("#showLocation");
        actualLocation.innerHTML = `${city}`;

        let actualTemperature = document.querySelector("#temperature"); 
        actualTemperature.innerHTML = `${temperature}`;

        let actualWeather = document.querySelector("#description");
        actualWeather.innerHTML = `${description}`;

        let actualHumidity = document.querySelector("#humidity");
        actualHumidity.innerHTML = `Humidity: ${humidity}%`;

        let actualWindSpeed = document.querySelector("#windspeed");
        actualWindSpeed.innerHTML = `Wind speed: ${windspeed}Km/h`;

        let lastUpdate = document.querySelector("#lastupdate");
        lastUpdate.innerHTML = formatDate(response.data.dt*1000);

        let actualWeatherIcon = document.querySelector("#weather_icon")
        actualWeatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${weather_icon}@2x.png`)

        
      }



/*
//Changing temperature from ºC ⇄ ºF

function toFahrenheit(event){
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `66`;

    let changeFahrenheit = document.querySelector("#fahrenheit");
    changeFahrenheit.classList.remove("weather_color_grey");
    changeFahrenheit.classList.add("weather_color_blue");

    let changeCelsius = document.querySelector("#celsius");
    changeCelsius.classList.remove("weather_color_blue")
    changeCelsius.classList.add("weather_color_grey")
}

let fahrenheit = document.querySelector("#fahrenheit")
fahrenheit.addEventListener("click", toFahrenheit)

function toCelsius(event){
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `19`;

    let changeCelsius = document.querySelector("#celsius");
    changeCelsius.classList.remove("weather_color_grey")
    changeCelsius.classList.add("weather_color_blue")

    let changeFahrenheit = document.querySelector("#fahrenheit");
    changeFahrenheit.classList.remove("weather_color_blue");
    changeFahrenheit.classList.add("weather_color_grey");
}

let celsius = document.querySelector("#celsius")
celsius.addEventListener("click", toCelsius) */
