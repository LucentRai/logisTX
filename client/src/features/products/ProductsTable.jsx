import PropTypes from "prop-types";

import Table from "../../ui/Table";


function ProductsTable({data}){

	function render(row){

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