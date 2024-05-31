import PropTypes from "prop-types";

import Table from "../../ui/Table";


function ProductsTable({data}){

	function render(row){
		return (
			<>
				<td>{row.name}</td>
				<td>{row.price}</td>
				<td>{row.category}</td>
				<td>{row.stockQuantity}</td>
				<td><img src={`/img/products/${row.imgUrl[0]}`} alt={row.name} /></td>
				<td>{row.weight}</td>
			</>
		);
	}

	return (
		<Table>
			<Table.Head columns={["Name", "Price", "Category", "Stock", "Image", "Weight"]} />
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