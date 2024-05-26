import OrdersTableOperations from "../features/orders/OrdersTableOperations";

function Orders(){

	return (
		<>
			<h1 className="h2">Orders</h1>
			<section className="section">
				<div className="row">
					<OrdersTableOperations />
				</div>
			</section>
		</>
	);
}

export default Orders;