import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import RoutingMachine from '../utils/RoutingMachine';


function Maps(){

	return (
		<MapContainer zoom={13} scrollWheelZoom={false}>
			<TileLayer
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<RoutingMachine />
		</MapContainer>
	);
}

export default Maps;