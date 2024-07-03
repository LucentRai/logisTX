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
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import toast from 'react-hot-toast';

import { MAP_CENTER } from '../../../../constants.json';

function MapCoordinates() {
	const [modal, setModal] = useState(false);
	// Optional: State to store and display coordinates
	const [coordinates, setCoordinates] = useState([]);

	function MapClickHandler() {
		useMapEvents({
			click: (e) => {
				setCoordinates([ e.latlng.lat, e.latlng.lng ]); // Update state with clicked coordinates
				setModal(!modal);
			},
		});
		return null;
	}

	function copyCoordinatesToClipboard() {
		const coordinatesStr = `${coordinates[0]}, ${coordinates[1]}`;
		navigator.clipboard.writeText(coordinatesStr)
			.then(() => {
				toast.success('Coordinates copied to clipboard');
			})
			.catch(err => {
				console.error('Failed to copy coordinates: ', err);
			});
	}

	return (
		<>
			<Modal isOpen={modal} toggle={MapClickHandler}>
				<ModalHeader toggle={() => setModal(!modal)}>Coordinates</ModalHeader>
				<ModalBody>Lattitude: {coordinates[0]}<br />Longitude: {coordinates[1]}</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={copyCoordinatesToClipboard}>Copy</Button>
					<Button color="secondary" onClick={() => setModal(!modal)}>Close</Button>
				</ModalFooter>
			</Modal>
			<MapContainer center={MAP_CENTER} zoom={13} scrollWheelZoom={false}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<MapClickHandler />
				{/* Optionally render coordinates on the page */}
				{coordinates && <p>Clicked at Latitude: {coordinates.lat}, Longitude: {coordinates.lng}</p>}
			</MapContainer>
		</>
	);
}

export default MapCoordinates;