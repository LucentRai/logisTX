import AddTransport from "../features/transports/AddTransport";
import TransportsTable from "../features/transports/TransportsTable";


function Transports(){

	return (
		<>
		<div className="d-flex justify-content-between align-items-end mb-2">
			<h1 className="h2 mb-0">Transports</h1>
			<AddTransport />
		</div>
		<section className="section">
			<div className="row">
				<TransportsTable />
			</div>
		</section>
		</>
	);
}

export default Transports;