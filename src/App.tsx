import { useState} from 'react'
//import type {City, CitySearchResult, Location, Weather} from "./main.tsx";
import './App.css'
import useLocation from "./hook.tsx";
import useWeather from "./hook.tsx";

const [currsearch, setcurrsearch] = useState<String>("Freehold");
const autocomplete = useAutocomplete(currsearch);


fetch('https://api.geoapify.com/v1/geocode/search?text=marlboro,%20nj&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658')
fetch('https://api.geoapify.com/v1/geocode/search?text=${marlboro%20nj}&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658')
fetch('https://api.geoapify.com/v1/geocode/autocomplete?text=${marlboro,%20nj}&type=city&limit=10&filter=countrycode%3Aus&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658,')

export default function App() {
    const { loc, fetchLocation } = useLocation();
    const [city, setCity] = useState("");
    const weather = useWeather(loc);

    function handleSelect(cityName: string) {
        setCity(cityName);
        fetchLocation(cityName);
    }

    return (
        <div>

        </div>
    );
}
export default App
