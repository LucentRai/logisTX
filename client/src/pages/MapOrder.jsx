import PropTypes from 'prop-types';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import SpinnerFullPage from '../ui/SpinnerFullPage';
import { useOrder } from '../features/orders/useOrder';
import NotFound from './NotFound';
import RoutingMachine from '../utils/RoutingMachine';
import { useSelector } from 'react-redux';


function MapOrder({orderId}){
	const {isLoading, order} = useOrder(orderId);
	const warehouses = useSelector(state => state.warehouses);

	if(isLoading) return <SpinnerFullPage />;
	if(!order) return <NotFound />;

	const waypoints = order.orderItems.map(product => {
		const warehouse = warehouses.find(warehouse => warehouse._id === product.warehouseId);
		return warehouse.location;
	});


	return (
		<MapContainer center={order.destination} zoom={13} scrollWheelZoom={false}>
			<TileLayer
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={order.destination}>
				<Popup>
					{order.customerId.name}<br /> {order.customerId.address}
				</Popup>
			</Marker>
			<RoutingMachine waypoints={waypoints} />
		</MapContainer>
	);
}

MapOrder.propTypes = {
	orderId: PropTypes.string.isRequired,
};

export default MapOrder;