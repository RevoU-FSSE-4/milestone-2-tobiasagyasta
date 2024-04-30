import { useState, useEffect } from "react";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

const LocationFetcher = ({
	location,
	onCoordsChange,
	onLocationChange,
	onCountryChange,
	onTimeZoneChange,
}: any) => {
	const openCageAPIKey = process.env.REACT_APP_OPENCAGE_API_KEY;
	polyfillCountryFlagEmojis();
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);
	//useEffect for current position
	useEffect(() => {
		if (location === undefined) {
			fetchCurrentPosition();
		}
	}, []);
	//useEffect for current location
	useEffect(() => {
		if (latitude && longitude) {
			if (location === undefined) {
				fetchCurrentLocation();
			}
		}
	}, [latitude, longitude]);

	const fetchCurrentPosition = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLatitude(position.coords.latitude);
					setLongitude(position.coords.longitude);
				},
				(error) => {
					console.log(error);
				}
			);
		} else {
			console.log("Geolocation not supported in your browser.");
		}
	};
	const fetchCurrentLocation = async () => {
		try {
			onCoordsChange({ latitude, longitude });
			const response = await fetch(
				`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C+${longitude}&key=${openCageAPIKey}&pretty=1`
			);
			const data = await response.json();
			if (data.results.length > 0) {
				const results = data.results[0];
				const formatted = results.formatted;
				const cleanedAddress = formatted.replace(/\bunnamed road\b,?/i, "");
				const flag = results.annotations.flag;
				const timezone = results.annotations.timezone.name;
				onLocationChange(cleanedAddress);
				onCountryChange(flag);
				onTimeZoneChange(timezone);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return <></>;
};

export default LocationFetcher;
