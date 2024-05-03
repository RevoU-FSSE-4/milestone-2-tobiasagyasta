import { useState, useEffect } from "react";
import { WeatherData } from "../interfaces/WeatherData";
import { Coordinates } from "../interfaces/Coordinates";
import LocationMap from "../components/LocationMap";
import MountTransition from "../components/MountTransition";
import LocationFetcher from "../components/LocationFetcher";
import WeatherFetcher from "../components/WeatherFetcher";
import TimeFetcher from "../components/TimeFetcher";
import SearchBar from "../components/SearchBar";
import Loading from "./Loading";
import GradientBackground from "../components/GradientBackground";
import "../styles/css/weather-icons.css";
import "../styles/css/weather-icons-wind.css";

const Home = () => {
	const [location, setLocation] = useState("");
	const [countryEmoji, setCountryEmoji] = useState("");
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [coords, setCoords] = useState<Coordinates | null>(null);
	const [timeZone, setTimeZone] = useState<string | null>(null);
	const [temperature, setTemperature] = useState<string | null>(null);
	const [feelsLike, setFeelsLike] = useState<string | null>(null);
	const [tempMin, setTempMin] = useState<string | null>(null);
	const [tempMax, setTempMax] = useState<string | null>(null);
	const [isCelcius, setIsCelcius] = useState<boolean>(true);
	const [color, setColor] = useState<string>("#FFFFFF");

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
		if (weatherData) {
			setTemperature(weatherData.main.temp.toFixed(0));
			setFeelsLike(weatherData.main.feels_like.toFixed(0));
			setTempMax(weatherData.main.temp_max.toFixed(0));
			setTempMin(weatherData.main.temp_min.toFixed(0));
			setColor(getColor(weatherData.weather[0].id));
		}
	}, [weatherData]);
	const getColor = (weatherID: number) => {
		if (weatherID >= 200 && weatherID < 300)
			//Thunderstorm
			return "#302B63";
		if (weatherID >= 300 && weatherID < 400)
			//Drizzle
			return "#E2E2E2";
		if (weatherID >= 500 && weatherID < 600)
			//Rain
			return "#262626";
		if (weatherID >= 600 && weatherID < 700)
			//Snow
			return "#B5D6FF";
		if (weatherID >= 700 && weatherID < 800)
			//Atmosphere
			return "#ebe2c3";
		if (weatherID >= 800) {
			// Clear
			if (weatherID > 800) {
				//Cloudy
				return "#BDBDBD";
			}
			return "#dbdb86";
		}
		return "#FFFFFF";
	};

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

			{weatherData !== undefined &&
			weatherData !== null &&
			timeZone !== null ? (
				<>
					<GradientBackground weatherID={weatherData.weather[0].id}>
						<div className='min-h-screen flex flex-row-reverse items-center justify-center'>
							<div className='flex flex-col bg-white rounded p-4 w-full max-w-xs text-center'>
								<MountTransition>
									<div className='font-bold text-2xl mb-3'>{`${location} ${countryEmoji}`}</div>
								</MountTransition>

								<div className='text-base text-gray-500'>
									<TimeFetcher timezone={timeZone}></TimeFetcher>
								</div>

								<MountTransition>
									<i
										className={`mt-5 inline-flex items-center justify-center wi wi-owm-${weatherData.weather[0].id}  text-9xl`}
										style={{ color: color }}
									></i>
								</MountTransition>
								<MountTransition>
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
											<div>
												{weatherData.weather[0].description
													.charAt(0)
													.toUpperCase() +
													weatherData.weather[0].description.slice(1)}
											</div>
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
								</MountTransition>
								<MountTransition>
									<div className='flex flex-row justify-between mt-6'>
										<div className='flex flex-col items-center'>
											<div className='font-medium text-sm'>Wind</div>
											<div className='text-sm text-gray-500'>
												{weatherData.wind.speed.toFixed(1)}m/s{" "}
												<i
													className={`wi wi-wind from-${weatherData.wind.deg}-deg text-base`}
												/>
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
								</MountTransition>
								<MountTransition>
									<LocationMap
										latitude={coords?.latitude ?? null}
										longitude={coords?.longitude ?? null}
										mapFor='home'
									/>
								</MountTransition>
								<SearchBar></SearchBar>
								<label className='mt-5 flex flex-row justify-end items-center cursor-pointer'>
									<span
										className={`ms-3 text-sm ${
											isCelcius ? `font-extrabold` : `font-normal`
										}  text-gray-900`}
									>
										°C
									</span>
									<input
										type='checkbox'
										onClick={handleTempConversion}
										className='sr-only peer'
									/>
									<div className="relative ms-3 w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  "></div>
									<span
										className={`ms-3 text-sm ${
											isCelcius ? `font-normal` : `font-extrabold`
										}  text-gray-900`}
									>
										°F
									</span>
								</label>
							</div>
						</div>
					</GradientBackground>
				</>
			) : (
				<Loading></Loading>
			)}
		</>
	);
};

export default Home;
