import OrdersTable from "../features/orders/OrdersTable";

function Orders(){
	const data = [
		{
			products: "Product 1, Product 2",
			customer: "Customer 1",
			orderedDate: "2021-09-01",
			status: "pending"
		},
		{
			products: "Product 1, Product 2",
			customer: "Customer 2",
			orderedDate: "2021-09-01",
			status: "on-route"
		},
		{
			products: "Product 1, Product 2",
			customer: "Customer 3",
			orderedDate: "2021-09-01",
			status: "delivered"
		},
	];

	return (
		<>
			<h1 className="h2">Orders</h1>
			<section className="section">
				<div className="row">
					<OrdersTable data={data} />
				</div>
			</section>
		</>
	);
}

export default Orders;