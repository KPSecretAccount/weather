import { useState } from 'react';
import './App.css';
import { useAutocomplete, useLocation, useWeather } from "./hook";

export default function App() {
    const [currSearch, setCurrSearch] = useState<string>("");
    const [currPlace, setCurrPlace] = useState<string>("");
    const autocomplete = useAutocomplete(currSearch);
    const location = useLocation(currPlace);
    const weather = useWeather(location ? location.lat : 0, location ? location.lon : 0);

    return (
        <div>
            <label>
                <input
                    value={currSearch}
                    onChange={(e) => setCurrSearch(e.target.value)}
                    placeholder="Type here to search"
                />
            </label>
            <div>
                {autocomplete?.map((auto, index) => (
                    <div key={index}>
                        <ul>
                            <button onClick={() => {
                                const nm = auto.state ? `${auto.city}, ${auto.state}` : auto.city;
                                setCurrPlace(nm);
                                setCurrSearch(nm);
                            }}>
                                {auto.state ? `${auto.city}, ${auto.state}` : auto.city} {}
                            </button>
                        </ul>
                    </div>
                ))}
                <button onClick={() => console.log("Search clicked")}>Search</button>
            </div>
        </div>




































































    );
}

