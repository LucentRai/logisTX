import WarehousesTable from "../features/warehouses/WarehousesTable";


function Warehouses(){
	const data = [];

	return (
		<>
		<h1 className="h2">Warehouses</h1>
		<section className="section">
			<div className="row">
				<WarehousesTable data={data} />
			</div>
		</section>
		</>
	);
}

export default Warehouses;