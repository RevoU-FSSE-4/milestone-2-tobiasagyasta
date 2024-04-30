import data from "../data/DummyData.json";
import TimeFetcher from "../components/TimeFetcher";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import "../styles/css/weather-icons.css";

const Display = () => {
	polyfillCountryFlagEmojis();
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
							<span className=' relative font-medium text-6xl left-2'>
								{`${data.main.temp.toFixed(0)}°`}
							</span>

							<span className='font-light text-base'>
								{`Feels like ${data.main.feels_like.toFixed(0)}°`}
							</span>
						</div>

						<div className='flex flex-col items-center ml-6'>
							<div>{data.weather[0].description}</div>
							<div className='mt-1'>
								<span className='text-sm'>
									<i className='far fa-long-arrow-up'></i>
								</span>
								<span className='text-sm font-light text-gray-500'>
									{data.main.temp_max.toFixed(0)}°C
								</span>
							</div>
							<div>
								<span className='text-sm'>
									<i className='far fa-long-arrow-down'></i>
								</span>
								<span className='text-sm font-light text-gray-500'>
									{data.main.temp_min.toFixed(0)}°C
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
							<div className='text-sm text-gray-500'>{data.main.humidity}%</div>
						</div>
						<div className='flex flex-col items-center'>
							<div className='font-medium text-sm'>Visibility</div>
							<div className='text-sm text-gray-500'>
								{data.visibility / 1000}km
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Display;
