import './Weather.css';
import '../App.css';
import { useState } from 'react';
import moment from 'moment';

const api = {
  key: '9983e134bb0c19083c7891c2bf4e38ed',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function Weather() {

  const [query, setQuery] = useState();
  const [weather, setWeather] = useState({});

  const weatherURL = `${api.base}weather?q=${query}&units=metric&appid=${api.key}`;

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(weatherURL)
        .then(res => res.json())
        .then(weatherResult => {
          setWeather(weatherResult);
          setQuery('');
          console.log(weatherResult);
        });
    }
  }

  const weatherClass = () => {
    switch (weather.weather[0].main) {
      case 'Clear': return 'Weather clear';
      case 'Clouds': return 'Weather clouds';
      case 'Drizzle': return 'Weather drizzle';
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
      case 'Sand':
      case 'Ash':
      case 'Squall':
      case 'Tornado':
        return 'Weather atmosphere';
      case 'Rain': return 'Weather rain';
      case 'Snow': return 'Weather snow';
      case 'Thunderstorm': return 'Weather thunderstorm';
      default: return 'Weather';
    }
  }

  return (
    <div className={(typeof weather.main != "undefined"
      ?
      weatherClass()
      : 'Weather')}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <img src={require("../images/icons/location.png").default} alt="location"></img>
              <div>{weather.name}, {weather.sys.country}</div>
              <div>{moment(new Date()).format('dddd MMMM D')}</div>
            </div>

            <div className="weather-box">
              <img src={require("../images/icons/" + weather.weather[0].icon + ".png").default} alt={weather.weather[0].description} />
              <div>{Math.round(weather.main.temp)}°C</div>
              <div>{weather.weather[0].description}</div>
            </div>

            <div className="weather-details">
              <div>{Math.round(weather.main.temp_min)}°C / {Math.round(weather.main.temp_max)}°C</div>
              <div>
                {moment(weather.sys.sunrise * 1000).format('hh:mm a')}
                <img src={require("../images/icons/sunrise.png").default} alt="sunrise"></img>
              </div>
              <div>
                {moment(weather.sys.sunset * 1000).format('hh:mm a')}
                <img src={require("../images/icons/sunset.png").default} alt="sunset"></img>
              </div>
              <div>
                {weather.main.pressure} hPa
                <img src={require("../images/icons/pressure.png").default} alt="atmosphere pressure"></img>
              </div>
              <div>
                {weather.main.humidity}%
                <img src={require("../images/icons/humidity.png").default} alt="humidity"></img>
              </div>
              <div>
                {weather.wind.speed} m/s
                <img src={require("../images/icons/wind_speed.png").default} alt="wind speed"></img>
              </div>
              <div>
                {weather.clouds.all}%
                <img src={require("../images/icons/cloud.png").default} alt="cloudiness"></img>
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default Weather;
