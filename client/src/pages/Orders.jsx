import { useQuery } from "@tanstack/react-query";

import OrdersTable from "../features/orders/OrdersTable";
import { getAllOrders } from "../services/apiOrders.";
import SpinnerFullPage from "../ui/SpinnerFullPage";

function Orders(){
	const {
		data: {documents} = {},
		isLoading
	} = useQuery({
		queryKey: ['orders'],
		queryFn: getAllOrders
	});

	if(isLoading){
		return <SpinnerFullPage />;
	}

	const orders = documents.map(order => {
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