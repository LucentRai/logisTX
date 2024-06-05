import PropTypes from "prop-types";

import Table from "../../ui/Table";


function ProductsTable({data}){

	function render(row){
		return (
			<>
				<td>{row.name}</td>
				<td>{row.price}</td>
				<td>{row.stockQuantity}</td>
				{/* <td><img src={`/img/products/${row.imgUrl[0]}`} alt={row.name} style={{borderRadius: 'var(--bs-border-radius)', width: '80px', height: 'auto'}} /></td> */}
				<td>{row.weight}</td>
			</>
		);
	}

	return (
		<Table>
			<Table.Head columns={["Name", "Price", "Stock", "Weight"]} />
			<Table.Body
				data={data}
				render={render}/>
		</Table>
	);
}

ProductsTable.propTypes = {
	data: PropTypes.array.isRequired
};

export default ProductsTable;