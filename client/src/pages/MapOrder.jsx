import PropTypes from 'prop-types';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import SpinnerFullPage from '../ui/SpinnerFullPage';
import { useOrder } from '../features/orders/useOrder';
import NotFound from './NotFound';
import { useEffect } from 'react';


function MapOrder({orderId}){
	const {isLoading, order} = useOrder(orderId);

	useEffect(() => {
		console.log(order);
	}, [order]);

	if(isLoading) return <SpinnerFullPage />;

	if(!order) return <NotFound />;


	return (
		<MapContainer center={order.destination} zoom={13} scrollWheelZoom={false}>
			<TileLayer
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={order.destination}>
				<Popup>
					Customer Name
				</Popup>
			</Marker>
			{/* <RoutingMachine /> */}
		</MapContainer>
	);
}

MapOrder.propTypes = {
	orderId: PropTypes.string.isRequired,
};

export default MapOrder;