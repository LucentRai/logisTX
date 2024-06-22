import 'leaflet/dist/leaflet.css';
import MapOrder from './MapOrder';
import { useSearchParams } from 'react-router-dom';

// import RoutingMachine from '../utils/RoutingMachine';


function Maps(){
	// const mapCenter = import.meta.env.VITE_MAP_CENTER.split(',').map(coord => parseFloat(coord));
	const [searchParams] = useSearchParams();
	const orderId = searchParams.get('order');

	return (
		<>
			{orderId && <MapOrder orderId={orderId} />}
		</>
	);
}

export default Maps;