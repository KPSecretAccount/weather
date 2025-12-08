import {useEffect, useState} from 'react'

export default function useAutocomplete(currSearch: string) {
    const [list, setList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!currSearch) {
            setList([]);
            return;
        }

        setLoading(true);

        fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${currSearch}&type=city&limit=10&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658`
        )
            .then(res => res.json())
            .then(data => {
                setList(data?.features || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [currSearch]);

    return { list, loading };
}
export default function useLocation() {
    const [loc, setLoc] = useState<any | null>(null);

    function fetchLocation(city: string) {
        fetch(
            `https://api.geoapify.com/v1/geocode/search?text=${city}&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658`
        )
            .then(res => res.json())
            .then(data => {
                const feature = data?.features?.[0];
                if (feature) {
                    setLoc({
                        city,
                        lat: feature.properties.lat,
                        lon: feature.properties.lon
                    });
                }
            });
    }

    return { loc, fetchLocation };
}
export default function useWeather(loc: any) {
    const [weather, setWeather] = useState<any | null>(null);

    useEffect(() => {
        if (!loc) return;

        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}` +
            `&longitude=${loc.lon}` +
            `&daily=weather_code,temperature_2m_min,temperature_2m_max,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_hours,precipitation_probability_max,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max,wind_gusts_10m_max` +
            `&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,weather_code,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,uv_index,is_day` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,weather_code` +
            `&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;

        fetch(url)
            .then(res => res.json())
            .then(data => setWeather(data))
            .catch(err => console.log(err));
    }, [loc]);

    return weather;
}



