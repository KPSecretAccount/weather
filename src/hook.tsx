import { useEffect, useState } from "react";

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

export function useAutocomplete(currSearch: string) {
    const [autocompletelist, setlst] = useState<{ city: string; state: string }[]>([]);

    useEffect(() => {
        if (currSearch && currSearch !== " ") {
            fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${currSearch}&type=city&limit=10&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658`)
                .then(res => res.json())
                .then(data => {
                    const list = data.results.map((r: any) => ({
                        city: r.city || r.name || "", state: r.state_code || r.state || ""
                    }));
                    setlst(list);
                    console.log("auto", data);
                })
                .catch(err => console.log(err));
        }
    }, [currSearch]);

    return autocompletelist;
}

export function useWeather(lat: number, lon: number) {
    const [weather, setWeather] = useState<any>(null);

    useEffect(() => {
        if (lat && lon) {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`)
                .then((res) => res.json())
                .then((data) => setWeather(data))
                .catch((err) => console.log(err));
        }
    }, [lat, lon]);

    return weather;
}


