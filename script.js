const APIWEATHERLATLONG = "http://api.openweathermap.org/data/2.5/weather?";
const APIWEATHERID = "&appid=a627d1e8c60b92052800621f1415617a";
const APIWEATHERCITYNAME = "http://api.openweathermap.org/data/2.5/weather?q=";
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

function getLocation() {
   navigator.geolocation.getCurrentPosition(getLatLong)
}

function getLatLong(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    getDataLocation(lat, long)
}   

function getDataLocation(lat, long){
    const promise = axios.get(`${APIWEATHERLATLONG}lat=${lat}&lon=${long}${APIWEATHERID}`);
    promise.then(getApiData);
    promise.catch(apiError);
}

function getApiData(weather){
    const dataWeather = weather.data;
    renderWeatherLocation(dataWeather);
}

function apiError(){
    alert("Opa! Parece que deu um erro. Vamos recarregar essa página e fingir que nada aconteceu...");
    window.location.reload();
}

function renderWeatherLocation(dataWeather){
    const location = document.querySelector('.location-climate');
    const locationName = dataWeather.name;
    const locationTemp = dataWeather.main.temp;
    const locationMaxTemp = dataWeather.main.temp_max;
    const locationMinTemp = dataWeather.main.temp_min;
    const locationFeelsLike = dataWeather.main.feels_like;
    const locationIcon = `http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`;

    location.innerHTML = `A temperatura em <img src = ${locationIcon}></img> ${locationName} é ${(locationTemp -273.15).toFixed(1)}°Celsius, a temperatura máxima é ${(locationMaxTemp -273.15).toFixed(1)}°Celsius e a 
    mínima é ${(locationMinTemp -273.15).toFixed(1)}°Celsius. A sensação térmica é de ${(locationFeelsLike -273.15).toFixed(1)}°Celsius!`;
}

function getLocationByName(){
    const input = document.querySelector('input');
    if(input.value === ""){
        alert("Tem que botar o nome de uma cidade aí cara!")
    }else{
        const promise = axios.get(`${APIWEATHERCITYNAME}${input.value}${APIWEATHERID}`);
        input.placeholder = input.value;
        input.value = "";
        promise.then(getApiData);
        promise.catch(apiError);
    }
}

getLocation();

