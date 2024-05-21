import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";


function createRoutingMachineLayer() {
	const routeLineColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-map-route-line');
	const instance = L.Routing.control({
		waypoints: [[27.7049, 85.3270], [27.6559, 85.3150]],
		lineOptions: {
			styles: [{ color: routeLineColor, weight: 4 }]
		},
		show: false,
		addWaypoints: false,
		routeWhileDragging: true,
		draggableWaypoints: true,
		fitSelectedRoutes: true,
		showAlternatives: false
	});


	return instance;
}

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;