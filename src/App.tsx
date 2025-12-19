import { useState } from 'react';
import './App.css';
import { useAutocomplete, useLocation, useWeather } from "./hook";

new Date("t").toLocaleString("en-US")
{
    year: "numeric";
    month: "numeric";
    day: "numeric";
    hour: "numeric";
    minute: "numeric";
}
export default function App() {
    const [currSearch, setCurrSearch] = useState<string>("");
    const [currPlace, setCurrPlace] = useState<string>("");
    const autocomplete = useAutocomplete(currSearch);
    const location = useLocation(currPlace);
    const lat = location ? location.lat : 0;
    const lon = location ? location.lon : 0;
    const weather = useWeather(lat, lon);

    return (
        <div className="input-container">
            <div>
                <input type="text" name="text" className="input" value={currSearch}
                       onChange={e => setCurrSearch((e.target as HTMLInputElement).value)}
                       placeholder="Type here to search"/>
            </div>

            <div>
                {autocomplete?.map((auto, index) => (
                    <div key={index}>
                        <ul>
                            <button
                                onClick={() => {
                                    setCurrPlace(auto.formatted);
                                    setCurrSearch(auto.formatted);
                                }}
                            >
                                {auto.formatted}
                            </button>
                        </ul>
                    </div>
                ))}
            </div>


            {weather && (
                <div className="card1">
                    <h2>Current Weather</h2>
                    <p>Temperature: {weather.current.temperature_2m}°F</p>
                    <p>Feels like: {weather.current.apparent_temperature}°F</p>
                    <p>Humidity: {weather.current.relative_humidity_2m}%</p>
                    <p>Wind: {weather.current.wind_speed_10m} mph</p>
                    <p>Wind Gusts: {weather.current.wind_gusts_10m} mph</p>

                    <h3>Today</h3>
                    <p>High: {weather.daily.temperature_2m_max[0]}°F</p>
                    <p>Low: {weather.daily.temperature_2m_min[0]}°F</p>
                    <p>Humidity: {weather.hourly.relative_humidity_2m[0]}%</p>
                    <p>Sunrise: {weather.daily.sunrise[0]}</p>
                    <p>Sunset: {weather.daily.sunset[0]}</p>
                    <p>Wind: {weather.current.wind_speed_10m} mph</p>
                    <p>Wind Gusts: {weather.current.wind_gusts_10m} mph</p>
                </div>
            )}

            {weather && (
                <div className = "card1">
                    <h2>Hourly Forecast</h2>
                    <div className="hourly-container">
                        {weather.hourly.time.map((t, i) => (
                            <div className="hourly-card" key={i}>
                                <p className="hourly-time">{t}</p>

                                <div className="card">
                                    <div className="container">
                                        <div className="cloud front">
                                            <span className="left-front"></span>
                                            <span className="right-front"></span>
                                        </div>
                                        <span className="sun sunshine"></span>
                                        <span className="sun"></span>
                                        <div className="cloud back">
                                            <span className="left-back"></span>
                                            <span className="right-back"></span>
                                        </div>
                                    </div>

                                    <div className="card-header">
                                        <span>Temp: {weather.hourly.temperature_2m[i]}°F</span>
                                    </div>

                                    <p>Humidity: {weather.hourly.relative_humidity_2m[i]}%</p>
                                    <p>Preciptation: {weather.hourly.precipitation_probability[i]}%</p>
                                    <p>UV Index: {weather.hourly.uv_index[i]}</p>
                                    <p>Wind: {weather.current.wind_speed_10m} mph</p>
                                    <p>Wind Gusts: {weather.current.wind_gusts_10m} mph</p>


                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            )}


            {weather && (
                <div className ="card1">
                    <h2>7-Day Forecast</h2>
                    {weather.daily.time.map((day, i) => (
                        <div key={i}>
                            <h4>{day}</h4>
                            <p>High: {weather.daily.temperature_2m_max[i]}°F</p>
                            <p>Low: {weather.daily.temperature_2m_min[i]}°F</p>
                            <p>Feels like: {weather.current.apparent_temperature}°F</p>
                            <p>Humidity: {weather.hourly.relative_humidity_2m[i]}%</p>
                            <p>Precipitation: {weather.daily.precipitation_probability_max[i]}%</p>
                            <p>Sunrise: {weather.daily.sunrise[i]}</p>
                            <p>Sunset: {weather.daily.sunset[i]}</p>
                            <p>Wind: {weather.current.wind_speed_10m} mph</p>
                            <p>Wind Gusts: {weather.current.wind_gusts_10m} mph</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
