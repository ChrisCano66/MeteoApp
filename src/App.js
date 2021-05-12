import React, { useState } from 'react';

// Constante reprenant les informations nécessaires pour l'API de Meteo sur le web
// d'où l'on a tirer les informations de météo (OpenWeather)
const api = {
  key: "bc36e882a4e6fd3709a242d6d7d5d173", 
  base: "http://api.openweathermap.org/data/2.5/"
}
// Pour du forecast : 
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={minutely}{alerts}&appid={API key}

//fonction principale
function App() {

  // Ensembles des hooks d'état permettant la récupération et la diffusion des datas de l'API
  const [queryCity, setQueryCity] = useState('');
  const [cityName, setCityName] = useState('')  
  const [countryName, setCountryName] = useState('')
  const [weather, setWeather] = useState({});
  const [tempBG, setTempBG] = useState('app');
  const [weatherImg, setWeatherImg] = useState('');
  const [weatherImgHourly0, setWeatherImgHourly0] = useState('');
  const [weatherImgHourly1, setWeatherImgHourly1] = useState('');
  const [weatherImgHourly2, setWeatherImgHourly2] = useState('');
  const [weatherImgHourly3, setWeatherImgHourly3] = useState('');
  const [weatherImgHourly4, setWeatherImgHourly4] = useState('');
  const [weatherImgHourly5, setWeatherImgHourly5] = useState('');  
  const [weatherImgDaily0, setWeatherImgDaily0] = useState('');
  const [weatherImgDaily1, setWeatherImgDaily1] = useState('');
  const [weatherImgDaily2, setWeatherImgDaily2] = useState('');
  const [weatherImgDaily3, setWeatherImgDaily3] = useState('');
  const [weatherImgDaily4, setWeatherImgDaily4] = useState('');
  const [weatherImgDaily5, setWeatherImgDaily5] = useState('');
  const [windDeg, setWindDeg] = useState('0.0');
  const [rain, setRain] = useState('0.00');

  // constante contenant les différents points cardinaux permettant de transformer 
  // la direction du vent en degrés des données de l'api en poiints cardinaux
  const compassPoints = ["N", "NNE", "NE", "ENE", 
                           "E", "ESE", "SE", "SSE",
                           "S", "SSW", "SW", "WSW", 
                           "W", "WNW", "NW", "NNW"];
  
  // const qui permet d'aller chercher les datas météo selon la localisation + assignation des différentes variables d'état
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${queryCity}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setCityName(result.name)
          setCountryName(result.sys.country)
          fetch(`${api.base}onecall?lat=${result.coord.lat}&lon=${result.coord.lon}&exclude={minutely}{alerts}&units=metric&APPID=${api.key}&lang=fr`)
          .then(res => res.json())
          .then(result => {

            // récupération de l'ensembles des données retournées par l'API
            setWeather(result);
            setQueryCity('');
            console.log(result);

            // condition qui permet de changer l'arrière plan selon la température affichée dans les données
            if (result.current.temp >= 30) {setTempBG('app-burn')}
            else if (result.current.temp >= 23 && result.current.temp < 30) {setTempBG('app-warm')}
            else if (result.current.temp >= 16 && result.current.temp < 23) {setTempBG('app-normal')}
            else if (result.current.temp >= 0 && result.current.temp < 16) {setTempBG('app-cold')}
            else if (result.current.temp < 0) {setTempBG('app-freezy')};

            // récupération et transformation des icônes de l'API afin d'afficher une icône plus appropriée
            if (result.current.weather[0].icon === '01d') {setWeatherImg('img-current sun');}
            else if (result.current.weather[0].icon === '02d') {setWeatherImg('img-current cloudy');}
            else if (result.current.weather[0].icon === '03d' || result.current.weather[0].icon === '04d' || result.current.weather[0].icon === '03n' || result.current.weather[0].icon === '04n') {setWeatherImg('img-current cloud');}
            else if (result.current.weather[0].icon === '09d' || result.current.weather[0].icon === '09n') {setWeatherImg('img-current rain ');}
            else if (result.current.weather[0].icon === '10d') {setWeatherImg('img-current rainy');}
            else if (result.current.weather[0].icon === '11d' || result.current.weather[0].icon === '11n') {setWeatherImg('img-current lightning');}
            else if (result.current.weather[0].icon === '13d' || result.current.weather[0].icon === '13n') {setWeatherImg('img-current snowy');}
            else if (result.current.weather[0].icon === '50d' || result.current.weather[0].icon === '50n') {setWeatherImg('img-current foggy');}
            else if (result.current.weather[0].icon === '01n') {setWeatherImg('img-current full-moon');}
            else if (result.current.weather[0].icon === '02n') {setWeatherImg('img-current half-moon');}
            else if (result.current.weather[0].icon === '10n') {setWeatherImg('img-current rainy-moon');};          
            
            // récupération et transformation des icônes de la partie Hourly 0 (+1h) de l'API afin d'afficher une icône plus appropriée
            if (result.hourly[0].weather[0].icon === '01d') {setWeatherImgHourly0('img-h-d sun');}
            else if (result.hourly[0].weather[0].icon === '02d') {setWeatherImgHourly0('img-h-d cloudy');}
            else if (result.hourly[0].weather[0].icon === '03d' || result.hourly[0].weather[0].icon === '04d' || result.hourly[0].weather[0].icon === '03n' || result.hourly[0].weather[0].icon === '04n') {setWeatherImgHourly0('img-h-d cloud');}
            else if (result.hourly[0].weather[0].icon === '09d' || result.hourly[0].weather[0].icon === '09n') {setWeatherImgHourly0('img-h-d rain');}
            else if (result.hourly[0].weather[0].icon === '10d') {setWeatherImgHourly0('img-h-d rainy');}
            else if (result.hourly[0].weather[0].icon === '11d' || result.hourly[0].weather[0].icon === '11n') {setWeatherImgHourly0('img-h-d lightning');}
            else if (result.hourly[0].weather[0].icon === '13d' || result.hourly[0].weather[0].icon === '13n') {setWeatherImgHourly0('img-h-d snowy');}
            else if (result.hourly[0].weather[0].icon === '50d' || result.hourly[0].weather[0].icon === '50n') {setWeatherImgHourly0('img-h-d foggy');}
            else if (result.hourly[0].weather[0].icon === '01n') {setWeatherImgHourly0('img-h-d full-moon');}
            else if (result.hourly[0].weather[0].icon === '02n') {setWeatherImgHourly0('img-h-d half-moon');}
            else if (result.hourly[0].weather[0].icon === '10n') {setWeatherImgHourly0('img-h-d rainy-moon');};   
            
            // récupération et transformation des icônes de la partie Hourly 1 (+2h) de l'API afin d'afficher une icône plus appropriée
            if (result.hourly[1].weather[0].icon === '01d') {setWeatherImgHourly1('img-h-d sun');}
            else if (result.hourly[1].weather[0].icon === '02d') {setWeatherImgHourly1('img-h-d cloudy');}
            else if (result.hourly[1].weather[0].icon === '03d' || result.hourly[1].weather[0].icon === '04d' || result.hourly[1].weather[0].icon === '03n' || result.hourly[1].weather[0].icon === '04n') {setWeatherImgHourly1('img-h-d cloud');}
            else if (result.hourly[1].weather[0].icon === '09d' || result.hourly[1].weather[0].icon === '09n') {setWeatherImgHourly1('img-h-d rain');}
            else if (result.hourly[1].weather[0].icon === '10d') {setWeatherImgHourly1('img-h-d rainy');}
            else if (result.hourly[1].weather[0].icon === '11d' || result.hourly[1].weather[0].icon === '11n') {setWeatherImgHourly1('img-h-d lightning');}
            else if (result.hourly[1].weather[0].icon === '13d' || result.hourly[1].weather[0].icon === '13n') {setWeatherImgHourly1('img-h-d snowy');}
            else if (result.hourly[1].weather[0].icon === '50d' || result.hourly[1].weather[0].icon === '50n') {setWeatherImgHourly1('img-h-d foggy');}
            else if (result.hourly[1].weather[0].icon === '01n') {setWeatherImgHourly1('img-h-d full-moon');}
            else if (result.hourly[1].weather[0].icon === '02n') {setWeatherImgHourly1('img-h-d half-moon');}
            else if (result.hourly[1].weather[0].icon === '10n') {setWeatherImgHourly1('img-h-d rainy-moon');};

            // récupération et transformation des icônes de la partie Hourly 2 (+3h) de l'API afin d'afficher une icône plus appropriée
            if (result.hourly[2].weather[0].icon === '01d') {setWeatherImgHourly2('img-h-d sun');}
            else if (result.hourly[2].weather[0].icon === '02d') {setWeatherImgHourly2('img-h-d cloudy');}
            else if (result.hourly[2].weather[0].icon === '03d' || result.hourly[2].weather[0].icon === '04d' || result.hourly[2].weather[0].icon === '03n' || result.hourly[2].weather[0].icon === '04n') {setWeatherImgHourly2('img-h-d cloud');}
            else if (result.hourly[2].weather[0].icon === '09d' || result.hourly[2].weather[0].icon === '09n') {setWeatherImgHourly2('img-h-d rain');}
            else if (result.hourly[2].weather[0].icon === '10d') {setWeatherImgHourly2('img-h-d rainy');}
            else if (result.hourly[2].weather[0].icon === '11d' || result.hourly[2].weather[0].icon === '11n') {setWeatherImgHourly2('img-h-d lightning');}
            else if (result.hourly[2].weather[0].icon === '13d' || result.hourly[2].weather[0].icon === '13n') {setWeatherImgHourly2('img-h-d snowy');}
            else if (result.hourly[2].weather[0].icon === '50d' || result.hourly[2].weather[0].icon === '50n') {setWeatherImgHourly2('img-h-d foggy');}
            else if (result.hourly[2].weather[0].icon === '01n') {setWeatherImgHourly2('img-h-d full-moon');}
            else if (result.hourly[2].weather[0].icon === '02n') {setWeatherImgHourly2('img-h-d half-moon');}
            else if (result.hourly[2].weather[0].icon === '10n') {setWeatherImgHourly2('img-h-d rainy-moon');};

            // récupération et transformation des icônes de la partie Hourly 3 (+4h) de l'API afin d'afficher une icône plus appropriée
            if (result.hourly[3].weather[0].icon === '01d') {setWeatherImgHourly3('img-h-d sun');}
            else if (result.hourly[3].weather[0].icon === '02d') {setWeatherImgHourly3('img-h-d cloudy');}
            else if (result.hourly[3].weather[0].icon === '03d' || result.hourly[3].weather[0].icon === '04d' || result.hourly[3].weather[0].icon === '03n' || result.hourly[3].weather[0].icon === '04n') {setWeatherImgHourly3('img-h-d cloud');}
            else if (result.hourly[3].weather[0].icon === '09d' || result.hourly[3].weather[0].icon === '09n') {setWeatherImgHourly3('img-h-d rain');}
            else if (result.hourly[3].weather[0].icon === '10d') {setWeatherImgHourly3('img-h-d rainy');}
            else if (result.hourly[3].weather[0].icon === '11d' || result.hourly[3].weather[0].icon === '11n') {setWeatherImgHourly3('img-h-d lightning');}
            else if (result.hourly[3].weather[0].icon === '13d' || result.hourly[3].weather[0].icon === '13n') {setWeatherImgHourly3('img-h-d snowy');}
            else if (result.hourly[3].weather[0].icon === '50d' || result.hourly[3].weather[0].icon === '50n') {setWeatherImgHourly3('img-h-d foggy');}
            else if (result.hourly[3].weather[0].icon === '01n') {setWeatherImgHourly3('img-h-d full-moon');}
            else if (result.hourly[3].weather[0].icon === '02n') {setWeatherImgHourly3('img-h-d half-moon');}
            else if (result.hourly[3].weather[0].icon === '10n') {setWeatherImgHourly3('img-h-d rainy-moon');};

            // récupération et transformation des icônes de la partie Hourly 4 (+5h) de l'API afin d'afficher une icône plus appropriée
            if (result.hourly[4].weather[0].icon === '01d') {setWeatherImgHourly4('img-h-d sun');}
            else if (result.hourly[4].weather[0].icon === '02d') {setWeatherImgHourly4('img-h-d cloudy');}
            else if (result.hourly[4].weather[0].icon === '03d' || result.hourly[4].weather[0].icon === '04d' || result.hourly[4].weather[0].icon === '03n' || result.hourly[4].weather[0].icon === '04n') {setWeatherImgHourly4('img-h-d cloud');}
            else if (result.hourly[4].weather[0].icon === '09d' || result.hourly[4].weather[0].icon === '09n') {setWeatherImgHourly4('img-h-d rain');}
            else if (result.hourly[4].weather[0].icon === '10d') {setWeatherImgHourly4('img-h-d rainy');}
            else if (result.hourly[4].weather[0].icon === '11d' || result.hourly[4].weather[0].icon === '11n') {setWeatherImgHourly4('img-h-d lightning');}
            else if (result.hourly[4].weather[0].icon === '13d' || result.hourly[4].weather[0].icon === '13n') {setWeatherImgHourly4('img-h-d snowy');}
            else if (result.hourly[4].weather[0].icon === '50d' || result.hourly[4].weather[0].icon === '50n') {setWeatherImgHourly4('img-h-d foggy');}
            else if (result.hourly[4].weather[0].icon === '01n') {setWeatherImgHourly4('img-h-d full-moon');}
            else if (result.hourly[4].weather[0].icon === '02n') {setWeatherImgHourly4('img-h-d half-moon');}
            else if (result.hourly[4].weather[0].icon === '10n') {setWeatherImgHourly4('img-h-d rainy-moon');};

            // récupération et transformation des icônes de la partie Hourly 5 (+6h) de l'API afin d'afficher une icône plus appropriée
            if (result.hourly[5].weather[0].icon === '01d') {setWeatherImgHourly5('img-h-d sun');}
            else if (result.hourly[5].weather[0].icon === '02d') {setWeatherImgHourly5('img-h-d cloudy');}
            else if (result.hourly[5].weather[0].icon === '03d' || result.hourly[5].weather[0].icon === '04d' || result.hourly[5].weather[0].icon === '03n' || result.hourly[5].weather[0].icon === '04n') {setWeatherImgHourly5('img-h-d cloud');}
            else if (result.hourly[5].weather[0].icon === '09d' || result.hourly[5].weather[0].icon === '09n') {setWeatherImgHourly5('img-h-d rain');}
            else if (result.hourly[5].weather[0].icon === '10d') {setWeatherImgHourly5('img-h-d rainy');}
            else if (result.hourly[5].weather[0].icon === '11d' || result.hourly[5].weather[0].icon === '11n') {setWeatherImgHourly5('img-h-d lightning');}
            else if (result.hourly[5].weather[0].icon === '13d' || result.hourly[5].weather[0].icon === '13n') {setWeatherImgHourly5('img-h-d snowy');}
            else if (result.hourly[5].weather[0].icon === '50d' || result.hourly[5].weather[0].icon === '50n') {setWeatherImgHourly5('img-h-d foggy');}
            else if (result.hourly[5].weather[0].icon === '01n') {setWeatherImgHourly5('img-h-d full-moon');}
            else if (result.hourly[5].weather[0].icon === '02n') {setWeatherImgHourly5('img-h-d half-moon');}
            else if (result.hourly[5].weather[0].icon === '10n') {setWeatherImgHourly5('img-h-d rainy-moon');};

            // récupération et transformation des icônes de la partie Daily 0 (+1j) de l'API afin d'afficher une icône plus appropriée
            if (result.daily[0].weather[0].icon === '01d') {setWeatherImgDaily0('img-h-d sun');}
            else if (result.daily[0].weather[0].icon === '02d') {setWeatherImgDaily0('img-h-d cloudy');}
            else if (result.daily[0].weather[0].icon === '03d' || result.daily[0].weather[0].icon === '04d' || result.daily[0].weather[0].icon === '03n' || result.daily[0].weather[0].icon === '04n') {setWeatherImgDaily0('img-h-d cloud');}
            else if (result.daily[0].weather[0].icon === '09d' || result.daily[0].weather[0].icon === '09n') {setWeatherImgDaily0('img-h-d rain');}
            else if (result.daily[0].weather[0].icon === '10d') {setWeatherImgDaily0('img-h-d rainy');}
            else if (result.daily[0].weather[0].icon === '11d' || result.daily[0].weather[0].icon === '11n') {setWeatherImgDaily0('img-h-d lightning');}
            else if (result.daily[0].weather[0].icon === '13d' || result.daily[0].weather[0].icon === '13n') {setWeatherImgDaily0('img-h-d snowy');}
            else if (result.daily[0].weather[0].icon === '50d' || result.daily[0].weather[0].icon === '50n') {setWeatherImgDaily0('img-h-d foggy');}
            else if (result.daily[0].weather[0].icon === '01n') {setWeatherImgDaily0('img-h-d full-moon');}
            else if (result.daily[0].weather[0].icon === '02n') {setWeatherImgDaily0('img-h-d half-moon');}
            else if (result.daily[0].weather[0].icon === '10n') {setWeatherImgDaily0('img-h-d rainy-moon');};   
            
            // récupération et transformation des icônes de la partie Daily 1 (+2j) de l'API afin d'afficher une icône plus appropriée
            if (result.daily[1].weather[0].icon === '01d') {setWeatherImgDaily1('img-h-d sun');}
            else if (result.daily[1].weather[0].icon === '02d') {setWeatherImgDaily1('img-h-d cloudy');}
            else if (result.daily[1].weather[0].icon === '03d' || result.daily[1].weather[0].icon === '04d' || result.daily[1].weather[0].icon === '03n' || result.daily[1].weather[0].icon === '04n') {setWeatherImgDaily1('img-h-d cloud');}
            else if (result.daily[1].weather[0].icon === '09d' || result.daily[1].weather[0].icon === '09n') {setWeatherImgDaily1('img-h-d rain');}
            else if (result.daily[1].weather[0].icon === '10d') {setWeatherImgDaily1('img-h-d rainy');}
            else if (result.daily[1].weather[0].icon === '11d' || result.daily[1].weather[0].icon === '11n') {setWeatherImgDaily1('img-h-d lightning');}
            else if (result.daily[1].weather[0].icon === '13d' || result.daily[1].weather[0].icon === '13n') {setWeatherImgDaily1('img-h-d snowy');}
            else if (result.daily[1].weather[0].icon === '50d' || result.daily[1].weather[0].icon === '50n') {setWeatherImgDaily1('img-h-d foggy');}
            else if (result.daily[1].weather[0].icon === '01n') {setWeatherImgDaily1('img-h-d full-moon');}
            else if (result.daily[1].weather[0].icon === '02n') {setWeatherImgDaily1('img-h-d half-moon');}
            else if (result.daily[1].weather[0].icon === '10n') {setWeatherImgDaily1('img-h-d rainy-moon');};

            // récupération et transformation des icônes de la partie Daily 2 (+3j) de l'API afin d'afficher une icône plus appropriée
            if (result.daily[2].weather[0].icon === '01d') {setWeatherImgDaily2('img-h-d sun');}
            else if (result.daily[2].weather[0].icon === '02d') {setWeatherImgDaily2('img-h-d cloudy');}
            else if (result.daily[2].weather[0].icon === '03d' || result.daily[2].weather[0].icon === '04d' || result.daily[2].weather[0].icon === '03n' || result.daily[2].weather[0].icon === '04n') {setWeatherImgDaily2('img-h-d cloud');}
            else if (result.daily[2].weather[0].icon === '09d' || result.daily[2].weather[0].icon === '09n') {setWeatherImgDaily2('img-h-d rain');}
            else if (result.daily[2].weather[0].icon === '10d') {setWeatherImgDaily2('img-h-d rainy');}
            else if (result.daily[2].weather[0].icon === '11d' || result.daily[2].weather[0].icon === '11n') {setWeatherImgDaily2('img-h-d lightning');}
            else if (result.daily[2].weather[0].icon === '13d' || result.daily[2].weather[0].icon === '13n') {setWeatherImgDaily2('img-h-d snowy');}
            else if (result.daily[2].weather[0].icon === '50d' || result.daily[2].weather[0].icon === '50n') {setWeatherImgDaily2('img-h-d foggy');}
            else if (result.daily[2].weather[0].icon === '01n') {setWeatherImgDaily2('img-h-d full-moon');}
            else if (result.daily[2].weather[0].icon === '02n') {setWeatherImgDaily2('img-h-d half-moon');}
            else if (result.daily[2].weather[0].icon === '10n') {setWeatherImgDaily2('img-h-d rainy-moon');};

            // récupération et transformation des icônes de la partie Daily 3 (+4j) de l'API afin d'afficher une icône plus appropriée
            if (result.daily[3].weather[0].icon === '01d') {setWeatherImgDaily3('img-h-d sun');}
            else if (result.daily[3].weather[0].icon === '02d') {setWeatherImgDaily3('img-h-d cloudy');}
            else if (result.daily[3].weather[0].icon === '03d' || result.daily[3].weather[0].icon === '04d' || result.daily[3].weather[0].icon === '03n' || result.daily[3].weather[0].icon === '04n') {setWeatherImgDaily3('img-h-d cloud');}
            else if (result.daily[3].weather[0].icon === '09d' || result.daily[3].weather[0].icon === '09n') {setWeatherImgDaily3('img-h-d rain');}
            else if (result.daily[3].weather[0].icon === '10d') {setWeatherImgDaily3('img-h-d rainy');}
            else if (result.daily[3].weather[0].icon === '11d' || result.daily[3].weather[0].icon === '11n') {setWeatherImgDaily3('img-h-d lightning');}
            else if (result.daily[3].weather[0].icon === '13d' || result.daily[3].weather[0].icon === '13n') {setWeatherImgDaily3('img-h-d snowy');}
            else if (result.daily[3].weather[0].icon === '50d' || result.daily[3].weather[0].icon === '50n') {setWeatherImgDaily3('img-h-d foggy');}
            else if (result.daily[3].weather[0].icon === '01n') {setWeatherImgDaily3('img-h-d full-moon');}
            else if (result.daily[3].weather[0].icon === '02n') {setWeatherImgDaily3('img-h-d half-moon');}
            else if (result.daily[3].weather[0].icon === '10n') {setWeatherImgDaily3('img-h-d rainy-moon');};

            // récupération et transformation des icônes de la partie Daily 4 (+5j) de l'API afin d'afficher une icône plus appropriée
            if (result.daily[4].weather[0].icon === '01d') {setWeatherImgDaily4('img-h-d sun');}
            else if (result.daily[4].weather[0].icon === '02d') {setWeatherImgDaily4('img-h-d cloudy');}
            else if (result.daily[4].weather[0].icon === '03d' || result.daily[4].weather[0].icon === '04d' || result.daily[4].weather[0].icon === '03n' || result.daily[4].weather[0].icon === '04n') {setWeatherImgDaily4('img-h-d cloud');}
            else if (result.daily[4].weather[0].icon === '09d' || result.daily[4].weather[0].icon === '09n') {setWeatherImgDaily4('img-h-d rain');}
            else if (result.daily[4].weather[0].icon === '10d') {setWeatherImgDaily4('img-h-d rainy');}
            else if (result.daily[4].weather[0].icon === '11d' || result.daily[4].weather[0].icon === '11n') {setWeatherImgDaily4('img-h-d lightning');}
            else if (result.daily[4].weather[0].icon === '13d' || result.daily[4].weather[0].icon === '13n') {setWeatherImgDaily4('img-h-d snowy');}
            else if (result.daily[4].weather[0].icon === '50d' || result.daily[4].weather[0].icon === '50n') {setWeatherImgDaily4('img-h-d foggy');}
            else if (result.daily[4].weather[0].icon === '01n') {setWeatherImgDaily4('img-h-d full-moon');}
            else if (result.daily[4].weather[0].icon === '02n') {setWeatherImgDaily4('img-h-d half-moon');}
            else if (result.daily[4].weather[0].icon === '10n') {setWeatherImgDaily4('img-h-d rainy-moon');};

            // récupération et transformation des icônes de la partie Daily 5 (+6j) de l'API afin d'afficher une icône plus appropriée
            if (result.daily[5].weather[0].icon === '01d') {setWeatherImgDaily5('img-h-d sun');}
            else if (result.daily[5].weather[0].icon === '02d') {setWeatherImgDaily5('img-h-d cloudy');}
            else if (result.daily[5].weather[0].icon === '03d' || result.daily[5].weather[0].icon === '04d' || result.daily[5].weather[0].icon === '03n' || result.daily[5].weather[0].icon === '04n') {setWeatherImgDaily5('img-h-d cloud');}
            else if (result.daily[5].weather[0].icon === '09d' || result.daily[5].weather[0].icon === '09n') {setWeatherImgDaily5('img-h-d rain-h');}
            else if (result.daily[5].weather[0].icon === '10d') {setWeatherImgDaily5('img-h-d rainy');}
            else if (result.daily[5].weather[0].icon === '11d' || result.daily[5].weather[0].icon === '11n') {setWeatherImgDaily5('img-h-d lightning');}
            else if (result.daily[5].weather[0].icon === '13d' || result.daily[5].weather[0].icon === '13n') {setWeatherImgDaily5('img-h-d snowy');}
            else if (result.daily[5].weather[0].icon === '50d' || result.daily[5].weather[0].icon === '50n') {setWeatherImgDaily5('img-h-d foggy');}
            else if (result.daily[5].weather[0].icon === '01n') {setWeatherImgDaily5('img-h-d full-moon');}
            else if (result.daily[5].weather[0].icon === '02n') {setWeatherImgDaily5('img-h-d half-moon');}
            else if (result.daily[5].weather[0].icon === '10n') {setWeatherImgDaily5('img-h-d rainy-moon');};

            // récupération et transformation des informations sur la direction du vent en point cardinal
            const wind_Deg = () => {
              const rawPosition = Math.floor((result.current.wind_deg / 22.5) + 0.5);
              const arrayPosition = (rawPosition % 16);
              return compassPoints[arrayPosition];
            };
            setWindDeg(wind_Deg);

            // récupération de la pluviométrie
            if (result.current.rain) {
              let rainResult = Object.values(result.current.rain)
              setRain(rainResult[0])
            }
          })
        })
    }
  }

  // const récupérant la date du jour pour l'afficher 
  const dateBuilder = (d) => {
    let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    let days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={tempBG}>
      <main>
        <div className="title"><h1>Météo Locale</h1></div>
        <div className="container">
          <div className="search-box">
            <input 
              type="text" 
              className="search-bar" 
              placeholder="Indiquez une localisation..."
              onChange={event => setQueryCity(event.target.value)}
              value={queryCity}
              onKeyPress={search}
            />
          </div>
          {/** partie CURRENT */}
          {(typeof weather.current != "undefined") ? (
          <div className="content">
            <div className="location-box">
              <div className="location">{cityName}, {countryName}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="weather-info">
                <div className="weather-info-left">
                  {Math.round(weather.current.temp)}°C
                </div>
                <div className="weather-info-right">
                  <div className={weatherImg}></div>
                  <div className="weather">{weather.current.weather[0].description}</div>
                </div>
              </div>
              <div className="weather-info-bottom">
                <div className="info">
                  <div className="info-w">Humidité :</div><div className="info-w">{weather.current.humidity} %</div>
                </div>
                <div className="info">
                  <div className="info-w">P. Atm. :</div><div className="info-w">{weather.current.pressure} hPa</div>
                </div>
                <div className="info">
                  <div className="info-w">Vent :</div><div className="info-w">{weather.current.wind_speed} m/s, {windDeg}</div>
                </div>
                <div className="info">
                  <div className="info-w">Précipitation :</div><div className="info-w">{rain} mm3</div>
                </div>
                <div className="info">
                  <div className="info-w">Index UV :</div><div className="info-w">{weather.current.uvi}</div>
                </div>
              </div>
            </div>
            {/** partie HOURLY */}
            <div className="hourly">
              <div>
                <h1  className="hourly-temp">Prévisions sur 6 heures</h1>
              </div>              
              <div className="hourly-block">
                <div className="hourly-card">
                  <div className={weatherImgHourly0}></div>
                  <div className="hourly-temp-bis">+1h / {Math.round(weather.hourly[0].temp)}°C</div>
                </div>
                <div className="hourly-card">
                  <div className={weatherImgHourly1}></div>
                  <div className="hourly-temp-bis">+2h / {Math.round(weather.hourly[1].temp)}°C</div>
                </div>
                <div className="hourly-card">
                  <div className={weatherImgHourly2}></div>
                  <div className="hourly-temp-bis">+3h / {Math.round(weather.hourly[2].temp)}°C</div>
                </div>
                <div className="hourly-card">
                  <div className={weatherImgHourly3}></div>
                  <div className="hourly-temp-bis">+4h / {Math.round(weather.hourly[3].temp)}°C</div>
                </div>
                <div className="hourly-card">
                  <div className={weatherImgHourly4}></div>
                  <div className="hourly-temp-bis">+5h / {Math.round(weather.hourly[4].temp)}°C</div>
                </div>
                <div className="hourly-card">
                  <div className={weatherImgHourly5}></div>
                  <div className="hourly-temp-bis">+6h / {Math.round(weather.hourly[5].temp)}°C</div>
                </div>
              </div>
            </div>
            {/** partie DAILY */}
            <div className="hourly">
              <div>
                <h1  className="hourly-temp">Prévisions sur 6 jours</h1>
              </div>              
              <div className="hourly-block">
                <div className="hourly-card">
                  <div className={weatherImgDaily0}></div>
                  <div className="hourly-temp-bis">+1j / {Math.round(weather.daily[0].temp.day)}°C</div>
                </div>
                <div className="hourly-card">
                  <div className={weatherImgDaily1}></div>
                  <div className="hourly-temp-bis">+2j / {Math.round(weather.daily[1].temp.day)}°C</div>
                </div>
                <div className="hourly-card">
                  <div className={weatherImgDaily2}></div>
                  <div className="hourly-temp-bis">+3j / {Math.round(weather.daily[2].temp.day)}°C</div>
                </div>
                <div className="hourly-card">
                  <div className={weatherImgDaily3}></div>
                  <div className="hourly-temp-bis">+4j / {Math.round(weather.daily[3].temp.day)}°C</div>
                </div>
                <div className="hourly-card">
                  <div className={weatherImgDaily4}></div>
                  <div className="hourly-temp-bis">+5j / {Math.round(weather.daily[4].temp.day)}°C</div>
                </div>
                <div className="hourly-card">
                  <div className={weatherImgDaily5}></div>
                  <div className="hourly-temp-bis">+6j / {Math.round(weather.daily[5].temp.day)}°C</div>
                </div>
              </div>
            </div>
          </div>    
          ) : ('')}
        </div>
      </main>
    </div>
  );
}

export default App;
