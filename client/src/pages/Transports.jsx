import TransportsTable from "../features/transports/TransportsTable";


function Transports(){
	const data = [];

	return (
		<>
		<h1 className="h2">Transports</h1>
		<section className="section">
			<div className="row">
				<TransportsTable data={data} />
			</div>
		</section>
		</>
	);
}

export default Transports;