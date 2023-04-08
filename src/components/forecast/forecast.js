import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    const groupByDay = {};
    data.list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const day = date.getDay();
        if (!groupByDay[day]) {
            groupByDay[day] = [];
        }
        groupByDay[day].push(item);
    });

    return (
        <>
            <label className="title">Next days forecast</label>
            <Accordion allowZeroExpanded>
                {Object.entries(groupByDay).map(([day, items]) => (
                    <AccordionItem key={day}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img src={`icons/${items[0].weather[0].icon}.png`} className="icon-small" alt="weather" />
                                    <label className="day">{forecastDays[day]}</label>
                                    <label className="description">{items[0].weather[0].description}</label>
                                    <label className="min-max">{Math.round(items[0].main.temp_max)}°C /{Math.round(items[0].main.temp_min)}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="hourly-forecast-grid">
                                {items.map((item, idx) => (
                                    <div className="hourly-forecast-grid-item" key={idx}>
                                        <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                                        <label className="hour">{new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' })}</label>
                                        <label className="temperature2">{Math.round(item.main.temp)}°C</label>
                                    </div>
                                ))}
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
};

export default Forecast;