import { useEffect } from "react";
import { WeatherData } from "../interfaces/WeatherData";
const WeatherFetcher = ({ latitude, longitude, onWeatherChange }: any) => {
	const openWeatherAPIKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
	/* eslint-disable */
	useEffect(() => {
		if (latitude !== null && longitude !== null) {
			fetchCurrentWeather();
		}
	}, [latitude, longitude]);
	/* eslint-enable */
	const fetchCurrentWeather = async () => {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherAPIKey}&units=metric`
			);
			const data: WeatherData = await response.json();

			onWeatherChange(data);
		} catch (error) {
			console.log(error);
		}
	};
	return null;
};

export default WeatherFetcher;
