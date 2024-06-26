import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PendingStatus = styled.span`
	border: 1px solid var(--bs-primary);
	border-radius: 500px;
	background-color: #9fc5ff;
	padding: 2px 10px;
`;

const OnRouteStatus = styled.span`
	border: 1px solid var(--bs-warning);
	border-radius: 500px;
	background-color: #ffe282;
	padding: 2px 10px;
`;

const DeliveredStatus = styled.span`
	border: 1px solid var(--bs-success);
	border-radius: 500px;
	background-color: #0fff92;
	padding: 2px 10px;
`;

import Table from "../../ui/Table";

import SpinnerFullPage from "../../ui/SpinnerFullPage";
import { useOrders } from "./useOrders";


function OrdersTable(){
	const navigate = useNavigate();

	const {isLoading, orders} = useOrders();

	if(isLoading){
		return <SpinnerFullPage />;
	}

	const tableData = orders.map(order => {
		return {
			_id: order._id,
			products: order.orderItems.map(item => item.name).join(', '),
			customer: order.customerId.name,
			orderedDate: new Date(order.createdAt).toLocaleDateString(),
			status: order.status
		};
	});

	function handleRowClick(id){
		navigate(`/maps?order=${id}`);
	}

	function render(row){
		const tableCells = [];
		let i = 0;

		for(const key in row){
			if(key === '_id') continue;
			if(key === 'status'){
				switch(row[key]){
					case 'pending':
						tableCells.push(<td key={i++}><PendingStatus>{row[key]}</PendingStatus></td>);
						continue;
					case 'on-route':
						tableCells.push(<td key={i++}><OnRouteStatus>{row[key]}</OnRouteStatus></td>);
						continue;
					case 'delivered':
						tableCells.push(<td key={i++}><DeliveredStatus>{row[key]}</DeliveredStatus></td>);
						continue;
					default:
						tableCells.push(<td key={i++}>{row[key]}</td>);
				}
			}
			tableCells.push(<td key={i++}>{row[key]}</td>);
		}

		return tableCells;
	}

	return (
		<Table>
			<Table.Head columns={["Products", "Customer", "Ordered Date", "Status"]} />
			<Table.Body
				data={tableData}
				render={render}
				onRowClick={handleRowClick}
			/>
		</Table>
	);
}

export default OrdersTable;