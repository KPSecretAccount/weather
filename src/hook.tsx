fetch('https://api.geoapify.com/v1/geocode/search?text=marlboro,%20nj&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658')
fetch('https://api.geoapify.com/v1/geocode/search?text=${marlboro%20nj}&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658')
fetch('https://api.geoapify.com/v1/geocode/autocomplete?text=${marlboro,%20nj}&type=city&limit=10&filter=countrycode%3Aus&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658,')

import {useEffect, useState} from 'react'
import type {City, CitySearchResult, Location, Weather} from "./main.tsx";
export default function UseWeather() {
    const [weather, setWeather] = useState<Weather>([]);
    const [error, setError] = useState<String | null>(null);
    useEffect((): void => {
        fetch('https://api.geoapify.com/v1/geocode/search?text=marlboro&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658,')
            .then(response => response.json())
            .then(data => console.log(data)).catch(err => console.log(err));
    })
}

export default function useLocation (SearchedValue: String|null) : [weather|null, string|null]{
}

export default function autocomplete ()