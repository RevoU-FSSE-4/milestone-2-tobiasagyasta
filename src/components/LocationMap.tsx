function LocationMap({ latitude, longitude }: any) {
	const mapboxAPIKey = process.env.REACT_APP_MAPBOX_API_KEY;
	let zoom = 9;

	const width = 600; // Width of the map image
	const height = 400; // Height of the map image

	// Construct the URL for the static map image
	const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},${zoom}/${width}x${height}?access_token=${mapboxAPIKey}`;

	return (
		<div className='relative flex justify-center items-center text-center my-3'>
			<div className=' h-auto'>
				{/* Map image */}
				<img src={mapUrl} alt='Location Map' className='w-full h-auto' />
			</div>
		</div>
	);
}

export default LocationMap;
