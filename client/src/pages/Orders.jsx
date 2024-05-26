import styled from "styled-components";
import OrdersTableOperations from "../features/orders/OrdersTableOperations";

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

function Orders(){

	return (
		<>
			<Row>
				<h1 className="h2">Orders</h1>
				<OrdersTableOperations />
			</Row>
			<section className="section">
				<div className="row">
					<table className="table table-striped">
						<thead className="table-primary">
							<tr>
								<td>S.N.</td>
								<td>Products</td>
								<td>Customer</td>
								<td>Ordered Date</td>
								<td>Status</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>Furniture</td>
								<td>Kashmin</td>
								<td>2024-10-1</td>
								<td>On Route</td>
							</tr>
							<tr>
								<td>1</td>
								<td>Furniture</td>
								<td>Kashmin</td>
								<td>2024-10-1</td>
								<td>On Route</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
		</>
	);
}

export default Orders;