import React, { useEffect, useState } from "react";
import "./current-weather.css";
import rainy from '../images/rain.jpg';
import cloudy from '../images/cloudy.jpg';
import sunny from '../images/clear.jpg';
import snowy from '../images/snowy.jpg';
import green from '../images/green.jpg';
import thunder from '../images/thunder.jpg';
import fog from '../images/fog.jpg';

import { WEATHER_API_URL, WEATHER_API_KEY } from "../api";

const CurrentWeather = ({ data }) => {
    const [hourlyData, setHourlyData] = useState([]);

    useEffect(() => {
        async function fetchHourlyData() {
            const response = await fetch(
                `${WEATHER_API_URL}/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${WEATHER_API_KEY}&units=metric`            );
            const json = await response.json();
            setHourlyData(json.list.slice(0, 8));
            if (data.weather[0].main === "Clouds" ) {
                document.documentElement.style.setProperty("--img", "url(" + cloudy + ")");
                document.documentElement.style.setProperty("--text", "#000000");
            } else if (data.weather[0].main === "Rain"|| data.weather[0].main === "Drizzle") {
                document.documentElement.style.setProperty( "--img", "url(" + rainy + ")");
                document.documentElement.style.setProperty("--text", "#000000");
            }
            // eslint-disable-next-line no-mixed-operators
            else if (data.weather[0].main === "Clear" || data.weather[0].main === "Sunny" || data.weather[0].main === "Mist" ) {
                document.documentElement.style.setProperty("--img","url(" + sunny + ")");
                document.documentElement.style.setProperty("--text", "#000000");
            }
            else if (data.weather[0].main === "Snow" || data.weather[0].main === "Haze") {
                document.documentElement.style.setProperty("--img", "url(" + snowy + ")");
                document.documentElement.style.setProperty("--text", "#000000");
            }
            else if (data.weather[0].main === "Thunderstorm"|| data.weather[0].main === "Tornado") {
                document.documentElement.style.setProperty("--img", "url(" + thunder + ")");
                document.documentElement.style.setProperty("--text", "#ffffff");
            }
            else if (data.weather[0].main === "Fog") {
                document.documentElement.style.setProperty("--img", "url(" + fog + ")");
                document.documentElement.style.setProperty("--text", "#ffffff");
            }
            else  {
                document.documentElement.style.setProperty("--img","url(" + green + ")");
                document.documentElement.style.setProperty("--text", "#ffffff");
            }
        }
        fetchHourlyData();
    }, [data]);

    return (
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">{data.name}</p>
                    <p className="weather-description">{data.weather[0].description}</p>
                </div>
                <label className="hour">{new Date(data.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })}</label>
                <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} />
            </div>
            <div className="bottom">
                <p className="temperature">{Math.round(data.main.temp)}°C</p>
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label">Details</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Feels like</span>
                        <span className="parameter-value">{Math.round(data.main.feels_like)}°C </span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-value">{data.wind.speed} m/s</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value">{data.main.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Pressure</span>
                        <span className="parameter-value">{data.main.pressure} hPa</span>
                    </div>
                </div>
            </div>
            <div className="current-left">
                <div className="hourly-forecast">
                    {hourlyData.map((hour, idx) => (
                        <div key={idx}>
                            <span className="hourly-time">{new Date(hour.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" })}</span>
                            <span className="hourly-temp">{Math.round(hour.main.temp)}°C</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
