import { useState } from "react";
import { WeatherData } from "../interfaces/WeatherData";
import LocationFetcher from "../components/LocationFetcher";

const Home = () => {
	const [city, setCity] = useState("");
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

	const handleCity = (city: string) => {
		setCity(city);
	};
	const handleWeather = (weather: WeatherData) => {
		setWeatherData(weather);
	};
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
	return (
		<>
			<div>My Location : {city}</div>

			<div>Weather data : {weatherData?.weather[0]?.description}</div>
			<div>Weather temperature : {weatherData?.main?.temp}</div>
			{/* <LocationFetcher
				onLocationChange={handleCity}
				onWeatherChange={handleWeather}
			></LocationFetcher> */}
		</>
	);
};

export default Home;
