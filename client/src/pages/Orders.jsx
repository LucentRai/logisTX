import OrdersTable from "../features/orders/OrdersTable";

function Orders(){


	return (
		<>
			<h1 className="h2">Orders</h1>
			<section className="section">
				<div className="row">
					<OrdersTable />
				</div>
			</section>
		</>
	);
}

export default Orders;