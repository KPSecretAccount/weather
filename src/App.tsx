import {useState} from 'react'
//import type {City, CitySearchResult, Location, Weather} from "./main.tsx";
import './App.css'
import useAutocomplete from "./hook.tsx";




fetch('https://api.geoapify.com/v1/geocode/search?text=marlboro,%20nj&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658')
fetch('https://api.geoapify.com/v1/geocode/search?text=${marlboro%20nj}&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658')
fetch('https://api.geoapify.com/v1/geocode/autocomplete?text=${marlboro,%20nj}&type=city&limit=10&filter=countrycode%3Aus&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658,')

export default function App() {
    const [count, setCount] = useState(0)
    const [currSearch, setCurrSearch] = useState<string>("Marlboro");

    return (
            <input value={currSearch}
                   onChange={e => setCurrSearch(e.target.value)}
                   placeholder="Type here to search"/>
    );
}

