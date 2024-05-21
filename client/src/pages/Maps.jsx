import { createContext } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// import L from 'leaflet';

import '../scss/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import RoutingMachine from '../utils/RoutingMachine';

const DefaultIcon = L.icon({
iconUrl: icon,
shadowUrl: iconShadow
});

export const WaypointsContext = createContext();

function Maps(){
	const add1 = [27.7049, 85.3270];
	const add2 = [27.6559, 85.3150];
	const waypoints = [add1, add2];

	return (
		<WaypointsContext.Provider value={waypoints}>
			<MapContainer center={[27.6944, 85.3202]} zoom={13} scrollWheelZoom={false}>
				<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<RoutingMachine />
			</MapContainer>
		</WaypointsContext.Provider>
	);
}

export default Maps;