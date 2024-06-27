import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';

import 'leaflet/dist/leaflet.css';
import SpinnerFullPage from '../../ui/SpinnerFullPage';

function Locations(){
	const warehouses = useSelector(state => state.warehouses);

	const center = warehouses.length > 0 ?
		warehouses.reduce((acc, warehouse) => {
			return [
				acc[0] + warehouse.location[0] / warehouses.length,
				acc[1] + warehouse.location[1] / warehouses.length
			];
		}, [0, 0]) 
		: null;

	
	if(!center){
		return <SpinnerFullPage />;
	}

	return (
		<div className="col-10">
			<MapContainer center={center} zoom={13} scrollWheelZoom={false}>
				<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{warehouses.map(warehouse => (
					<Marker key={warehouse._id} position={warehouse.location}>
						<Popup>
							{warehouse.name}
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}

export default Locations;