import '../scss/leaflet.scss';
import { MapContainer, TileLayer } from 'react-leaflet';


function Maps(){

	return (
		<>
			<MapContainer center={[27.6944, 85.3202]} zoom={15}scrollWheelZoom={false}>
				<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
		</>
	);
}

export default Maps;