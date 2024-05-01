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

	useEffect(() => {
		if (data) {
			setTemperature(data.main.temp.toFixed(0));
			setFeelsLike(data.main.feels_like.toFixed(0));
			setTempMax(data.main.temp_max.toFixed(0));
			setTempMin(data.main.temp_min.toFixed(0));
		}
	}, []);

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
			{data !== undefined ? (
				<div className='min-h-screen flex items-center justify-center'>
					<div className='flex flex-col bg-white rounded p-4 w-full max-w-xs text-center'>
						<div className='font-bold text-xl'>Indonesia 🇮🇩</div>
						<div className='text-sm text-gray-500'>
							<TimeFetcher></TimeFetcher>
						</div>

						<i
							className={`my-3 inline-flex items-center justify-center wi wi-owm-${data.weather[0].id} text-blue-400 text-8xl`}
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
								<div>{data.weather[0].description}</div>
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
									{(data.wind.speed * 3.6).toFixed(1)}km/h
								</div>
							</div>
							<div className='flex flex-col items-center'>
								<div className='font-medium text-sm'>Humidity</div>
								<div className='text-sm text-gray-500'>
									{data.main.humidity}%
								</div>
							</div>
							<div className='flex flex-col items-center'>
								<div className='font-medium text-sm'>Visibility</div>
								<div className='text-sm text-gray-500'>
									{data.visibility / 1000}km
								</div>
							</div>
						</div>
						<label className='mt-5 inline-flex justify-start items-center cursor-pointer'>
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
		</>
	);
};

export default Display;
