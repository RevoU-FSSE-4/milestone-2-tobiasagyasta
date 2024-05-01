import { useEffect, useState } from "react";
import data from "../data/DummyData.json";
import TimeFetcher from "../components/TimeFetcher";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import "../styles/css/weather-icons.css";

const Display = () => {
	polyfillCountryFlagEmojis();
	const [temperature, setTemperature] = useState<string | null>(null);
	const [feelsLike, setFeelsLike] = useState<string | null>(null);
	const [tempMin, setTempMin] = useState<string | null>(null);
	const [tempMax, setTempMax] = useState<string | null>(null);
	const [isCelcius, setIsCelcius] = useState<boolean>(true);

	// const description = data.weather[0].description;
	// const temperature = data.main.temp;
	// const feelsLike = data.main.feels_like;
	// const tempMin = data.main.temp_min;
	// const tempMax = data.main.temp_max;
	// const humidity = data.main.humidity;
	// const pressure = data.main.pressure;
	// const visibility = data.visibility;
	// const cloudiness = data.clouds.all;
	// const windSpeed = data.wind.speed;
	// const windDirection = data.wind.deg;
	return <></>;
};

export default Display;
