import { createContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import RoutingMachine from '../utils/RoutingMachine';

export const WaypointsContext = createContext();

function Maps(){
	const add1 = [27.7049, 85.3270];
	const add2 = [27.6559, 85.3150];
	const waypoints = [add1, add2];

	return (
		<WaypointsContext.Provider value={waypoints}>
			<MapContainer center={import.meta.env.MAP_CENTER} zoom={13} scrollWheelZoom={false}>
				<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<RoutingMachine />
			</MapContainer>
		</WaypointsContext.Provider>
	);
}

export default Maps;