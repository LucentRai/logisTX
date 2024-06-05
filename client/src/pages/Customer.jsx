import CustomersTable from "../features/customers/CustomersTable";

function Customers(){
	return (
		<>
		<div className="d-flex justify-content-between align-items-end mb-2">
			<h1 className="h2 mb-0">Customers</h1>
		</div>
		<section className="section">
			<div className="row">
				<CustomersTable />
			</div>
		</section>
		</>
	);
}

export default Customers;