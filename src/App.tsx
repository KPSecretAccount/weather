import { useState } from "react";
import "./App.css";
import { useAutocomplete, useLocation, useWeather } from "./hook";

function formatHour(iso: string) {
    return new Date(iso).toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
    });
}
function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}


function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
    });
}

function getWeatherClass(code: number, isDay: number) {
    if (code === 51 || code === 53 || code === 55 || code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82)
        return "rainy";
    if (code === 2 || code === 3)
        return "cloudy";
    if (!isDay)
        return "night";
    return "sunny";
}



export default function App() {
    const [currSearch, setCurrSearch] = useState("");
    const [currPlace, setCurrPlace] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [showAllDays, setShowAllDays] = useState(false);
    const autocomplete = useAutocomplete(currSearch);
    const location = useLocation(currPlace);
    let lat = 0;
    let lon = 0;
    if (location) {
        lat = location.lat;
        lon = location.lon;
    }
    const weather = useWeather(lat, lon);
    let hourlyByDay: any = {};
    if (weather) {
        hourlyByDay = weather.hourly.time.reduce((acc: any, time, i) => {
            const day = time.split("T")[0];
            if (!acc[day]) {
                acc[day] = [];
            }
            acc[day].push(i);
            return acc;
        }, {});
    }
    const days = Object.keys(hourlyByDay);
    const visibleDays = showAllDays ? days : days.slice(0, 1);

    return (
        <div className="input-container">
            <input className="input" value={currSearch} placeholder="Type here to search"
                   onChange={e => {
                       setCurrSearch(e.target.value);
                       setHasSearched(false);
                   }}/>

            {!hasSearched &&
                autocomplete.map((auto, i) => (
                    <button key={i} onClick={() => {
                        setCurrPlace(auto.formatted);
                        setCurrSearch(auto.formatted);
                        setHasSearched(true);
                    }}>
                        {auto.formatted}
                    </button>
                ))}

            {weather && (
                <div className="card1">
                    <h2>Current Weather of {currPlace}</h2>
                    <p>Temperature: {weather.current.temperature_2m}°F</p>
                    <p>Feels like: {weather.current.apparent_temperature}°F</p>
                    <p>Humidity: {weather.current.relative_humidity_2m}%</p>
                    <p>Wind: {weather.current.wind_speed_10m} mph</p>
                    <p>Wind Gusts: {weather.current.wind_gusts_10m} mph</p>

                    <h3>Today</h3>
                    <p>High: {weather.daily.temperature_2m_max[0]}°F</p>
                    <p>Low: {weather.daily.temperature_2m_min[0]}°F</p>
                    <p>Humidity: {weather.hourly.relative_humidity_2m[0]}%</p>
                    <p>Sunrise: {formatTime(weather.daily.sunrise[0])}</p>
                    <p>Sunset: {formatTime(weather.daily.sunset[0])}</p>
                    <p>Wind: {weather.current.wind_speed_10m} mph</p>
                    <p>Wind Gusts: {weather.current.wind_gusts_10m} mph</p>
                </div>
            )}

            {weather && (
                <div className="card5">
                    <h2>Hourly Forecast</h2>

                    {visibleDays.map(day => (
                        <div key={day}>
                            <h3>{formatDate(day)}</h3>

                            <div className="hourly-grid">
                                {hourlyByDay[day].map((i: number) => (
                                    <div className="hourly-card" key={i}>
                                        <p>{formatHour(weather.hourly.time[i])}</p>

                                        {getWeatherClass(weather.hourly.weather_code[i], weather.hourly.is_day[i]) === "rainy" ? (
                                            <div className="weather-icon rainy"><span></span><span></span><span></span>
                                            </div>) : (<div
                                            className={"weather-icon " + getWeatherClass(weather.hourly.weather_code[i], weather.hourly.is_day[i])}/>)}

                                        <p>Temperature: {weather.hourly.temperature_2m[i]} °F</p>
                                        <p>Feels Like: {weather.hourly.apparent_temperature[i]} °F</p>
                                        <p>Humidity: {weather.hourly.relative_humidity_2m[i]} %</p>
                                        <p>Dew Point: {weather.hourly.dew_point_2m[i]} °F</p>
                                        <p>Precipation Probability: {weather.hourly.precipitation_probability[i]} %</p>
                                        <p>Precipitation: {weather.hourly.precipitation[i]} in</p>
                                        <p>Visibility: {weather.hourly.visibility[i]} m</p>
                                        <p>UV Index: {weather.hourly.uv_index[i]}</p>
                                        <p>Wind Speed: {weather.hourly.wind_speed_10m[i]} mph</p>
                                        <p>Wind Direction: {weather.hourly.wind_direction_10m[i]} °</p>
                                        <p>Wind Gusts: {weather.hourly.wind_gusts_10m[i]} mph</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {!showAllDays && (<button onClick={() => setShowAllDays(true)}>Show more</button>)}
                    {showAllDays && <button onClick={() => setShowAllDays(false)}>Show less</button>}

                </div>
            )}

            {weather && (
                <div className="card1">
                    <h2>7 Day Forecast</h2>

                    <div className="daily-cards">
                        {weather.daily.time.map((day, i) => (
                            <div key={i} className="daily-card">
                                <h4>{formatDate(day)}</h4>
                                <p>High Temp: {weather.daily.temperature_2m_max[i]} °F</p>
                                <p>Low Temp: {weather.daily.temperature_2m_min[i]} °F</p>
                                <p>Feels Like High: {weather.daily.apparent_temperature_max[i]} °F</p>
                                <p>Feels Like Low: {weather.daily.apparent_temperature_min[i]} °F</p>
                                <p>Sunrise: {formatTime(weather.daily.sunrise[i])}</p>
                                <p>Sunset: {formatTime(weather.daily.sunset[i])}</p>
                                <p>UV Index: {weather.daily.uv_index_max[i]}</p>
                                <p>Precipitation Sum: {weather.daily.precipitation_sum[i]} in</p>
                                <p>Precipatoin Hours: {weather.daily.precipitation_hours[i]}</p>
                                <p>Precipitation Probability: {weather.daily.precipitation_probability_max[i]} %</p>
                                <p>Wind Speed: {weather.daily.wind_speed_10m_max[i]} mph</p>
                                <p>Wind Gusts: {weather.daily.wind_gusts_10m_max[i]} mph</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}


