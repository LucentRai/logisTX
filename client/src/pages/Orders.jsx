import { useQuery } from "@tanstack/react-query";

import OrdersTable from "../features/orders/OrdersTable";
import { getAllOrders } from "../services/apiOrders.";

function Orders(){
	const {data} = useQuery({
		queryKey: ['orders'],
		queryFn: getAllOrders
	});


	const orders = data.documents.map(order => {
		return {
			products: order.orderItems.map(item => item.name).join(', '),
			customer: 'Customer Name',
			orderedDate: new Date(order.createdAt).toLocaleDateString(),
			status: order.status
		};
	});


	return (
		<>
			<h1 className="h2">Orders</h1>
			<section className="section">
				<div className="row">
					<OrdersTable data={orders} />
				</div>
			</section>
		</>
	);
}

export default Orders;