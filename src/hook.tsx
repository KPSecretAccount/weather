import { useEffect, useState } from "react";
import type {WeatherTypes} from "./wether";

export function useLocation(cityName: string) {
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

    useEffect(() => {
        if (cityName.trim() === "") return;

        fetch(`https://api.geoapify.com/v1/geocode/search?text=${cityName}&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658`)
            .then(res => res.json())
            .then(data => {
                if (data && data.results && data.results.length > 0) {
                    const r = data.results[0];
                    setLocation({ lat: r.lat, lon: r.lon });
                }
            })
            .catch(console.error);
    }, [cityName]);
    return location;
}

export function useAutocomplete(place: string) {
    const [list, setList] = useState<{ formatted: string }[]>([]);

    useEffect(() => {
        if (place.trim() === "") {
            setList([]);
            return;
        }

        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${place}&type=city&limit=10&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658`)
            .then(res => res.json())
            .then(data => {
                if (data && data.results) {
                    const newList = data.results.map((r: any) => ({
                        formatted: r.formatted
                    }));
                    setList(newList);
                }
            })
            .catch(console.error);
    }, [place]);
    return list;
}

export function useWeather(lat: number, lon: number) {
    const [weather, setWeather] = useState<WeatherTypes | null>(null);

    useEffect(() => {
        if (!lat || !lon) return;

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_min,temperature_2m_max,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_hours,precipitation_probability_max,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max,wind_gusts_10m_max&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,weather_code,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,uv_index,is_day&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,weather_code&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setWeather({
                        current: data.current,
                        daily: data.daily,
                        hourly: data.hourly
                    });
                }
            })
            .catch(console.error);
    }, [lat, lon]);
    return weather;
}
