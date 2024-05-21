import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";


function createRoutingMachineLayer() {
	const instance = L.Routing.control({
		waypoints: [[27.7049, 85.3270], [27.6559, 85.3150]],
		lineOptions: {
			styles: [{ color: "#6FA1EC", weight: 4 }]
		}
	});

	return instance;
}

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;