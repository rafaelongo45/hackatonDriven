const APIWEATHERLATLONG = "https://api.openweathermap.org/data/2.5/weather?";
const APIWEATHERID = "&appid=a627d1e8c60b92052800621f1415617a";
const APIWEATHERCITYNAME = "https://api.openweathermap.org/data/2.5/weather?q=";

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
    const city = document.querySelector('.city');
    const temp = document.querySelector('.temp');
    const tempFeelsLike = document.querySelector('.temp-feels-like');
    const tempMax = document.querySelector('.temp-max');
    const tempMin = document.querySelector('.temp-min');
    const locationName = dataWeather.name;
    const locationTemp = dataWeather.main.temp;
    const locationMaxTemp = dataWeather.main.temp_max;
    const locationMinTemp = dataWeather.main.temp_min;
    const locationFeelsLike = dataWeather.main.feels_like;
    const locationIcon = `https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`;

    city.innerHTML = `<h1>Local</h1>
    ${locationName}
    <img src = ${locationIcon}></img> 
    `
    temp.innerHTMl = `<h1>Temperatura</h1>
    ${(locationTemp -273.15).toFixed(1)}°Celsius
    `

    tempFeelsLike.innerHTML = `<h1>Sensação Térmica</h1>
    ${(locationFeelsLike -273.15).toFixed(1)}°Celsius!
    `
    tempMax.innerHTML = `<h1>Temperatura Máxima</h1>
    ${(locationMaxTemp -273.15).toFixed(1)}°Celsius
    `

    tempMin.innerHTML = `<h1>Temperatura Mínima</h1>
    ${(locationMinTemp -273.15).toFixed(1)}°Celsius
    `
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

