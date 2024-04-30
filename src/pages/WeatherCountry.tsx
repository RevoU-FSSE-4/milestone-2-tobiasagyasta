import { useParams } from "react-router-dom";
import data from "../data/CountryData.json";
import { useEffect, useState } from "react";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import { Coordinates } from "../interfaces/Coordinates";

const WeatherCountry = () => {
	polyfillCountryFlagEmojis();
	const params = useParams();
	const capital = params.capital;
	const [countryData, setCountryData] = useState<any>(null);
	const [countryLatitude, setCountryLatitude] = useState<number>(0);
	const [countryLongitude, setCountryLongitude] = useState<number>(0);

	useEffect(() => {
		if (capital !== undefined) {
			fetchCountryData(capital);
		}
	}, [capital]);

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

	return (
		<>
			<div>{capital ?? null}</div>
			{countryData && (
				<>
					<div>
						{countryData.country} {countryData.emoji_code}
						{countryLatitude} {countryLongitude}
					</div>
				</>
			)}
		</>
	);
};

export default WeatherCountry;
