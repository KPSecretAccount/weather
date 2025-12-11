import { useEffect, useState } from "react";



export interface CurrentWeather {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    precipitation: number;
    weather_code: number;
}

export interface DailyWeather {
    time: string[];
    weather_code: number[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    precipitation_sum: number[];
    precipitation_hours: number[];
    precipitation_probability_max: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
}

export interface HourlyWeather {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    dew_point_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    weather_code: number[];
    visibility: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    wind_gusts_10m: number[];
    precipitation: number[];
    uv_index: number[];
    is_day: number[];
}

export interface WeatherTypes {
    current: CurrentWeather;
    daily: DailyWeather;
    hourly: HourlyWeather;
}

export function useLocation(cityName: string) {
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
    useEffect(() => {
        if (cityName && cityName !== " ") {
            fetch(`https://api.geoapify.com/v1/geocode/search?text=${cityName}&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.results?.[0]) {
                        setLocation({ lat: data.results[0].lat, lon: data.results[0].lon });
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [cityName]);

    return location;
}


export function useAutocomplete(place: string) {
    const [autocompletelist, setlist] = useState<{ formatted: string }[]>([]);

    useEffect(() => {
        if (place && place.trim() !== "") {
            fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${place}&type=city&limit=10&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658`)
                .then(res => res.json())
                .then(data => {
                    const list = data.results.map((r: any) => ({
                        formatted: r.formatted
                    }));

                    setlist(list);
                })
                .catch(err => console.log(err));
        }
    }, [place]);

    return autocompletelist;
}




export function useWeather(lat:number,lon:number){
    const [weather,setWeather] = useState<WeatherTypes | null>(null);

    useEffect(() => {
        if (!lat || !lon) return;

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_min,temperature_2m_max,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_hours,precipitation_probability_max,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max,wind_gusts_10m_max&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,weather_code,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,uv_index,is_day&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,weather_code&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
            .then(res => res.json())
            .then((data) => {
                setWeather({
                    current: data.current,
                    daily: data.daily,
                    hourly: data.hourly
                });
            })
            .catch(console.error);

    }, [lat, lon]);

    return weather;
}

