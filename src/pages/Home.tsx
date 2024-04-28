import { useState } from "react";
import { WeatherData } from "../interfaces/WeatherData";
import { Coordinates } from "../interfaces/Coordinates";
import LocationFetcher from "../components/LocationFetcher";
import WeatherFetcher from "../components/WeatherFetcher";

const Home = () => {
	const [location, setLocation] = useState("");
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [coords, setCoords] = useState<Coordinates | null>(null);

	const handleLocation = (city: string) => {
		setLocation(city);
	};
	const handleWeather = (weather: WeatherData) => {
		setWeatherData(weather);
	};
	const handleCoords = (coords: Coordinates) => {
		if (coords.latitude !== undefined && coords.longitude !== undefined) {
			setCoords(coords);
		}
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
			<LocationFetcher
				onCoordsChange={handleCoords}
				onLocationChange={handleLocation}
			/>
			<WeatherFetcher
				latitude={coords?.latitude !== undefined ? coords.latitude : null}
				longitude={coords?.longitude !== undefined ? coords.longitude : null}
				onWeatherChange={handleWeather}
			/>
			<div>My Location : {location}</div>
			<div>
				Latitude : {coords?.latitude} Longitude : {coords?.longitude}
			</div>
			<div>Weather data : {weatherData?.weather[0]?.description}</div>
			<div>Weather temperature : {weatherData?.main?.temp} Celcius</div>
		</>
	);
};

export default Home;
