import 'leaflet/dist/leaflet.css';
import MapOrder from './MapOrder';
import { useSearchParams } from 'react-router-dom';
import MapCoordinates from '../features/maps/MapCoordinates';

// import RoutingMachine from '../utils/RoutingMachine';


function Maps(){
	const [searchParams] = useSearchParams();
	const orderId = searchParams.get('order');

	if(orderId) return <MapOrder orderId={orderId} />;

	return (
		<MapCoordinates />
	);
}

export default Maps;