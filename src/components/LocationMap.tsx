import React from "react";

function LocationMap({ latitude, longitude, mapFor }: any) {
	const accessToken =
		"pk.eyJ1IjoidGhhbG9tb2FuIiwiYSI6ImNsdmtwaGZkdjAwc2cybHBvdTllZWY3eTcifQ.sNGrknp1jcP_nmULOuVjAA"; // Your Mapbox access token
	let zoom = 9;
	if (mapFor === "home") {
		zoom = 13; // Zoom level
	}

	const width = 600; // Width of the map image
	const height = 400; // Height of the map image

	// Construct the URL for the static map image
	const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},${zoom}/${width}x${height}?access_token=${accessToken}`;

	return (
		<div className='relative flex justify-center items-center text-center my-3'>
			{/* Your weather app component */}
			<div>{/* Your weather app content */}</div>

			{/* Map container */}
			<div className=' h-auto'>
				{/* Map image */}
				<img src={mapUrl} alt='Location Map' className='w-full h-auto' />
			</div>
		</div>
	);
}

export default LocationMap;
