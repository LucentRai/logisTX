import PropTypes from "prop-types";
import styled from "styled-components";

const PendingStatus = styled.span`
	border: 1px solid #000;
	border-radius: 500px;
	background-color: #9fc5ff;
	padding: 2px 10px;
`;

const OnRouteStatus = styled.span`
	border: 1px solid #000;
	border-radius: 500px;
	background-color: #ffd44c;
	padding: 2px 10px;
`;

const DeliveredStatus = styled.span`
	border: 1px solid #000;
	border-radius: 500px;
	background-color: #0fff92;
	padding: 2px 10px;
`;

import Table from "../../ui/Table";


function OrdersTable({data}){

	function render(row){
		const tableCells = [];
		let i = 0;

		for(const key in row){
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
				data={data}
				render={render}/>
		</Table>
	);
}

OrdersTable.propTypes = {
	data: PropTypes.array.isRequired
};

export default OrdersTable;