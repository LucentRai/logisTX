import Sidebar from "../features/warehouses/Sidebar";
import Locations from "../features/warehouses/Locations";

function Warehouses(){

	return (
		<>
		<h1 className="h2">Warehouses</h1>
		<section className="section">
			<div className="row">
				<Sidebar />
				<Locations />
			</div>
		</section>
		</>
	);
}

export default Warehouses;