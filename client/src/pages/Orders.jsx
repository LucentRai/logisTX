import styled from "styled-components";
import OrdersTableOperations from "../features/orders/OrdersTableOperations";
import Table from "../ui/Table";

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

function Orders(){
	const data = [];
	// const data = [
	// 	{
	// 		products: "Product 1, Product 2",
	// 		customer: "Customer 1",
	// 		orderedDate: "2021-09-01",
	// 		status: "Pending"
	// 	},
	// 	{
	// 		products: "Product 1, Product 2",
	// 		customer: "Customer 2",
	// 		orderedDate: "2021-09-01",
	// 		status: "Pending"
	// 	},
	// 	{
	// 		products: "Product 1, Product 2",
	// 		customer: "Customer 3",
	// 		orderedDate: "2021-09-01",
	// 		status: "Pending"
	// 	},
	// ];

	return (
		<>
			<Row>
				<h1 className="h2">Orders</h1>
				<OrdersTableOperations />
			</Row>
			<section className="section">
				<div className="row">
					<Table>
						<Table.Head columns={["S.N.", "Products", "Customer", "Ordered Date", "Status"]} />
						<Table.Body data={data} />
					</Table>
				</div>
			</section>
		</>
	);
}

export default Orders;