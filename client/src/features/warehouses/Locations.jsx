import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';

import 'leaflet/dist/leaflet.css';

function Locations(){
	const warehouses = useSelector(state => state.warehouses);

	const center1 = warehouses.reduce((acc, warehouse) => {
		return [acc[0] + warehouse.location[0] / warehouses.length, acc[1] + warehouse.location[1] / warehouses.length];
	}, [0, 0]);
	console.log(center1);


	return (
		<div className="col-10">
			<MapContainer center={[ 27.684966666666668, 85.36236666666667 ]} zoom={13} scrollWheelZoom={false}>
				<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{warehouses.map(warehouse => (
					<Marker key={warehouse._id} position={warehouse.location}>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}

export default Locations;