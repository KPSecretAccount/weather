export interface CurrentWeather {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    wind_speed_10m: number;
    wind_direction: number;
    wind_gusts_10m: number;
    precipitation: number;
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




