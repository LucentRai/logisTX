// import { MapContainer, TileLayer } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// import {MAP_CENTER} from '../../../../constants.json';

// function MapCoordinates(){

// 	return (
// 		<MapContainer center={MAP_CENTER} zoom={13} scrollWheelZoom={false}>
// 			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// 		</MapContainer>
// 	);
// }

// export default MapCoordinates;

import { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { MAP_CENTER } from '../../../../constants.json';

function MapCoordinates() {
	// Optional: State to store and display coordinates
	const [coordinates, setCoordinates] = useState(null);

	function MapClickHandler() {
		useMapEvents({
			click: (e) => {
				const { lat, lng } = e.latlng;
				setCoordinates({ lat, lng }); // Update state with clicked coordinates
				alert(`Latitude: ${lat}, Longitude: ${lng}`); // Or use this to show coordinates immediately
			},
		});
		return null;
	}

	return (
		<MapContainer center={MAP_CENTER} zoom={13} scrollWheelZoom={false}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<MapClickHandler />
			{/* Optionally render coordinates on the page */}
			{coordinates && <p>Clicked at Latitude: {coordinates.lat}, Longitude: {coordinates.lng}</p>}
		</MapContainer>
	);
}

export default MapCoordinates;