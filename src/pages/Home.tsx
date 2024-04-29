import { useState } from "react";
import { WeatherData } from "../interfaces/WeatherData";
import { Coordinates } from "../interfaces/Coordinates";
import LocationFetcher from "../components/LocationFetcher";
import WeatherFetcher from "../components/WeatherFetcher";
import TimeFetcher from "../components/TimeFetcher";

const Home = () => {
	const [location, setLocation] = useState("");
	const [countryEmoji, setCountryEmoji] = useState("");
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [coords, setCoords] = useState<Coordinates | null>(null);
	const [timeZone, setTimeZone] = useState<string | null>(null);
	const [currentDate, setCurrentDate] = useState("");
	const [currentTime, setCurrentTime] = useState("");

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
	const handleTimeZone = (timeZone: string) => {
		setTimeZone(timeZone);
	};
	const handleCountryEmoji = (emoji: string) => {
		setCountryEmoji(emoji);
	};
	const handleTimeChange = ({ date, time }: any) => {
		if (date !== undefined && time !== undefined) {
			setCurrentDate(date);
			setCurrentTime(time);
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
				onCountryChange={handleCountryEmoji}
				onTimeZoneChange={handleTimeZone}
			/>
			<WeatherFetcher
				latitude={coords?.latitude ?? null}
				longitude={coords?.longitude ?? null}
				onWeatherChange={handleWeather}
			/>

			<div className='flex flex-col justify-center items-center text-center'>
				<h1 className='mb-4 text-lg font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>
					Current Location
				</h1>
				<div>
					{location} {countryEmoji}
				</div>
				<TimeFetcher timezone={timeZone} />
				<div>
					Latitude : {coords?.latitude} Longitude : {coords?.longitude}
				</div>
				<div>
					<h1 className='mb-4 text-lg font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>
						Current Weather
					</h1>
					<div>
						Weather description : {weatherData?.weather[0]?.description}
					</div>
					<div>
						Weather temperature : {weatherData?.main?.temp} Celcius, feels like{" "}
						{weatherData?.main.feels_like}
					</div>
					<div>Cloudiness : {weatherData?.clouds.all}</div>
					<div>Visibility : {weatherData?.visibility}</div>
					<div>
						Wind : {weatherData?.wind.speed} {weatherData?.wind.deg}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
