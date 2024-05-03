import { useState, useEffect } from "react";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

const LocationFetcher = ({
	latitudeProp,
	longitudeProp,
	onCoordsChange,
	onLocationChange,
	onCountryChange,
	onTimeZoneChange,
}: any) => {
	const openCageAPIKey = process.env.REACT_APP_OPENCAGE_API_KEY;
	polyfillCountryFlagEmojis();
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);
	/* eslint-disable */
	//useEffect for current position
	useEffect(() => {
		if (latitudeProp === undefined && longitudeProp === undefined) {
			fetchCurrentPosition();
		}
	}, []);

	//useEffect for current location
	useEffect(() => {
		if (latitudeProp === undefined && longitudeProp === undefined) {
			if (latitude && longitude) {
				fetchCurrentLocation();
			}
		} else {
			fetchSearchedLocationTimezone(latitudeProp, longitudeProp);
		}
	}, [latitude, longitude, latitudeProp, longitudeProp]);
	/* eslint-enable */

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
				console.log(results);
				const formatted = `${results.components.city}, ${results.components.country}`;
				const flag = results.annotations.flag;
				const timezone = results.annotations.timezone.name;
				onLocationChange(formatted);
				onCountryChange(flag);
				onTimeZoneChange(timezone);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const fetchSearchedLocationTimezone = async (
		latitudeProp: number,
		longitudeProp: number
	) => {
		try {
			const response = await fetch(
				`https://api.opencagedata.com/geocode/v1/json?q=${latitudeProp}%2C+${longitudeProp}&key=${openCageAPIKey}&pretty=1`
			);
			const data = await response.json();
			if (data.results.length > 0) {
				const results = data.results[0];
				const timezone = results.annotations.timezone.name;
				onTimeZoneChange(timezone);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return <></>;
};

export default LocationFetcher;
