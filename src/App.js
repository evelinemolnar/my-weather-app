import {useEffect, useState} from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./components/api";

function App() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");

        const currentWeatherFetch = fetch(
            `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const forecastFetch = fetch(
            `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );

        Promise.all([currentWeatherFetch, forecastFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forecastResponse = await response[1].json();

                setCurrentWeather({ city: searchData.label, ...weatherResponse });
                setForecast({ city: searchData.label, ...forecastResponse });
            })
            .catch(console.log);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;

                const currentWeatherFetch = fetch(
                    `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
                );
                const forecastFetch = fetch(
                    `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
                );

                Promise.all([currentWeatherFetch, forecastFetch])
                    .then(async (response) => {
                        const weatherResponse = await response[0].json();
                        const forecastResponse = await response[1].json();

                        setCurrentWeather({
                            city: weatherResponse.name,
                            ...weatherResponse,
                        });
                        setForecast({ city: weatherResponse.name, ...forecastResponse });
                    })
                    .catch(console.log);
            });
        }

    }, []);

    return (
        <div className="container">
            <h1 className="firsth1">Welcome to Weather Forecast.</h1>
            <Search onSearchChange={handleOnSearchChange} />
            <h2 className="secondh2">Weather at the moment</h2>
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {forecast && <Forecast data={forecast} />}
        </div>
    );
}

export default App;