import {useEffect, useState} from 'react'
export default function UseWeather(){
    const[weather,setWeather]=useState<Weather>([]);
    const[error,setError]=useState<String|null>(null);
    useEffect((): void => {
        fetch('https://api.geoapify.com/v1/geocode/search?text=marlboro&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658,')
        .then(response => response.json())
        .then(data => console.log(data)).catch(err => console.log(err));
    })
}