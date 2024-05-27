import PropTypes from "prop-types";

import Table from "../../ui/Table";


function WarehousesTable({data}){

	function render(row){

	}

	return (
		<Table>
			<Table.Head columns={["Name", "Address", "Operating Hours"]} />
			<Table.Body
				data={data}
				render={render}/>
		</Table>
	);
}

WarehousesTable.propTypes = {
	data: PropTypes.array.isRequired
};

export default WarehousesTable;