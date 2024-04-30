import { useParams, useNavigate } from "react-router-dom";
import data from "../data/CountryData.json";
import { useEffect, useState } from "react";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import LocationFetcher from "../components/LocationFetcher";
import TimeFetcher from "../components/TimeFetcher";
import WeatherFetcher from "../components/WeatherFetcher";
import { WeatherData } from "../interfaces/WeatherData";

const WeatherCountry = () => {
	polyfillCountryFlagEmojis();
	const params = useParams();

	const capital = params.capital;
	const navigate = useNavigate();
	const [countryData, setCountryData] = useState<any>(null);
	const [countryLatitude, setCountryLatitude] = useState<number | undefined>(
		undefined
	);
	const [countryLongitude, setCountryLongitude] = useState<number | undefined>(
		undefined
	);
	const [timezone, setTimeZone] = useState<string | null>(null);
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

	useEffect(() => {
		if (capital !== undefined) {
			fetchCountryData(capital);
		}
	}, [capital]);

	const handleTimeZone = (timeZone: string) => {
		setTimeZone(timeZone);
	};

	const fetchCountryData = (capital: string) => {
		const countryDataObject = data.find(
			(country) => country.capital === capital
		);
		if (countryDataObject) {
			setCountryData(countryDataObject);
			setCountryLatitude(countryDataObject.latitude);
			setCountryLongitude(countryDataObject.longitude);
		}
	};
	const handleWeather = (weather: WeatherData) => {
		setWeatherData(weather);
	};

	return (
		<>
			{countryLatitude !== undefined && countryLongitude !== undefined && (
				<>
					<LocationFetcher
						latitudeProp={countryLatitude}
						longitudeProp={countryLongitude}
						onTimeZoneChange={handleTimeZone}
					/>
					<WeatherFetcher
						latitude={countryLatitude}
						longitude={countryLongitude}
						onWeatherChange={handleWeather}
					/>
				</>
			)}
			<div className='flex flex-col justify-center items-center text-center'>
				<button
					type='button'
					className=' flex items-center justify-center w-1/3 px-3 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100'
					onClick={() => {
						navigate("/");
					}}
				>
					<svg
						className='w-5 h-5 rtl:rotate-180'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke-width='1.5'
						stroke='currentColor'
					>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
						/>
					</svg>
					<span>Go back</span>
				</button>
				{countryData && (
					<>
						<h1 className='mb-4 text-base font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>
							{`${capital}, ${countryData.country} ${countryData.emoji_code}`}
						</h1>
					</>
				)}

				<TimeFetcher timezone={timezone}></TimeFetcher>
				<div>
					<h1 className='mb-4 text-base font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>
						{`Weather in ${capital ?? "Searched area"}`}
					</h1>
					<div>
						Weather description : {weatherData?.weather[0]?.description}
					</div>
					<div>
						Weather temperature : {weatherData?.main?.temp} celcius, feels like{" "}
						{weatherData?.main.feels_like}
					</div>
					<div>Cloudiness : {weatherData?.clouds.all}</div>
					<div>Visibility : {weatherData?.visibility}</div>
					<div>
						Wind :{" "}
						{weatherData?.wind.speed !== undefined
							? weatherData?.wind?.speed * 3.6
							: null}{" "}
						km/h
						{weatherData?.wind.deg}
					</div>
					<div>Humidity : {weatherData?.main.humidity}</div>
				</div>
			</div>
		</>
	);
};

export default WeatherCountry;
