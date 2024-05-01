import { useState, useEffect } from "react";
import { WeatherData } from "../interfaces/WeatherData";
import { Coordinates } from "../interfaces/Coordinates";
import LocationFetcher from "../components/LocationFetcher";
import WeatherFetcher from "../components/WeatherFetcher";
import TimeFetcher from "../components/TimeFetcher";
import SearchBar from "../components/SearchBar";
import LoadingOverlay from "react-loading-overlay-nextgen";
import "../styles/css/weather-icons.css";

const Home = () => {
	const [location, setLocation] = useState("");
	const [countryEmoji, setCountryEmoji] = useState("");
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [coords, setCoords] = useState<Coordinates | null>(null);
	const [timeZone, setTimeZone] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [temperature, setTemperature] = useState<string | null>(null);
	const [feelsLike, setFeelsLike] = useState<string | null>(null);
	const [tempMin, setTempMin] = useState<string | null>(null);
	const [tempMax, setTempMax] = useState<string | null>(null);
	const [isCelcius, setIsCelcius] = useState<boolean>(true);

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
	useEffect(() => {
		if (weatherData !== null) {
			setIsLoading(false);
		}
	}, [weatherData]);
	useEffect(() => {
		if (weatherData) {
			setTemperature(weatherData.main.temp.toFixed(0));
			setFeelsLike(weatherData.main.feels_like.toFixed(0));
			setTempMax(weatherData.main.temp_max.toFixed(0));
			setTempMin(weatherData.main.temp_min.toFixed(0));
		}
	}, [weatherData]);

	const handleTempConversion = () => {
		if (isCelcius) {
			setIsCelcius(false);
			if (
				temperature !== null &&
				feelsLike !== null &&
				tempMax !== null &&
				tempMin !== null
			) {
				setTemperature(convertToFahrenheit(parseInt(temperature)));
				setFeelsLike(convertToFahrenheit(parseInt(feelsLike)));
				setTempMax(convertToFahrenheit(parseInt(tempMax)));
				setTempMin(convertToFahrenheit(parseInt(tempMin)));
			}
		}
		if (!isCelcius) {
			setIsCelcius(true);
			if (
				temperature !== null &&
				feelsLike !== null &&
				tempMax !== null &&
				tempMin !== null
			) {
				setTemperature(convertToCelcius(parseInt(temperature)));
				setFeelsLike(convertToCelcius(parseInt(feelsLike)));
				setTempMax(convertToCelcius(parseInt(tempMax)));
				setTempMin(convertToCelcius(parseInt(tempMin)));
			}
		}
	};
	const convertToFahrenheit = (celcius: number) => {
		return ((celcius * 9) / 5 + 32).toFixed(0);
	};
	const convertToCelcius = (fahrenheit: number) => {
		return (((fahrenheit - 32) * 5) / 9).toFixed(0);
	};
	// const description = weatherData.weather[0].description;
	// const temperature = weatherData.main.temp;
	// const feelsLike = weatherData.main.feels_like;
	// const tempMin = weatherData.main.temp_min;
	// const tempMax = weatherData.main.temp_max;
	// const humidity = weatherData.main.humidity;
	// const pressure = weatherData.main.pressure;
	// const visibility = weatherData.visibility;
	// const cloudiness = weatherData.clouds.all;
	// const windSpeed = weatherData.wind.speed;
	// const windDirection = weatherData.wind.deg;
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
			<LoadingOverlay active={isLoading} spinner text='Loading your content...'>
				{weatherData !== undefined && weatherData !== null ? (
					<div className='min-h-screen flex items-center justify-center'>
						<div className='flex flex-col bg-white rounded p-4 w-full max-w-xs text-center'>
							<SearchBar></SearchBar>
							<div className='font-bold text-xl'>{`${location} ${countryEmoji}`}</div>
							<div className='text-sm text-gray-500'>
								<TimeFetcher></TimeFetcher>
							</div>

							<i
								className={`mt-3 inline-flex items-center justify-center wi wi-owm-${weatherData.weather[0].id} text-blue-400 text-8xl`}
							></i>

							<div className='flex flex-row items-center justify-center mt-6'>
								<div className=' flex flex-col text-center items-center'>
									<span className=' relative font-semibold text-6xl left-1'>
										{`${temperature}°${isCelcius ? "C" : "F"}`}
									</span>

									<span className='font-light text-base'>
										{`Feels like ${feelsLike}°${isCelcius ? "C" : "F"}`}
									</span>
								</div>

								<div className='flex flex-col items-center ml-6'>
									<div>{weatherData.weather[0].description}</div>
									<div className='mt-1'>
										<span className='text-sm'>
											<i className='far fa-long-arrow-up'></i>
										</span>
										<span className='text-sm font-light text-gray-500'>
											{tempMax}°{isCelcius ? "C" : "F"}
										</span>
									</div>
									<div>
										<span className='text-sm'>
											<i className='far fa-long-arrow-down'></i>
										</span>
										<span className='text-sm font-light text-gray-500'>
											{tempMin}°{isCelcius ? "C" : "F"}
										</span>
									</div>
								</div>
							</div>
							<div className='flex flex-row justify-between mt-6'>
								<div className='flex flex-col items-center'>
									<div className='font-medium text-sm'>Wind</div>
									<div className='text-sm text-gray-500'>
										{(weatherData.wind.speed * 3.6).toFixed(1)}km/h
									</div>
								</div>
								<div className='flex flex-col items-center'>
									<div className='font-medium text-sm'>Humidity</div>
									<div className='text-sm text-gray-500'>
										{weatherData.main.humidity}%
									</div>
								</div>
								<div className='flex flex-col items-center'>
									<div className='font-medium text-sm'>Visibility</div>
									<div className='text-sm text-gray-500'>
										{weatherData.visibility / 1000}km
									</div>
								</div>
							</div>
							<label className='mt-5 inline-flex justify-end items-center cursor-pointer'>
								<span className='ms-3 text-sm font-medium text-gray-900 '>
									°C
								</span>
								<input
									type='checkbox'
									onClick={handleTempConversion}
									className='sr-only peer'
								/>
								<div className="relative ms-3 w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  "></div>
								<span className='ms-3 text-sm font-medium text-gray-900 '>
									°F
								</span>
							</label>
						</div>
					</div>
				) : null}
			</LoadingOverlay>
		</>
	);
};

export default Home;
