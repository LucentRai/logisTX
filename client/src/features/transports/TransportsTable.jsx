import PropTypes from "prop-types";

import Table from "../../ui/Table";


function TransportsTable({data}){

	function render(row){

	}

	return (
		<Table>
			<Table.Head columns={["Name", "Type", "Volumne", "Max Capacity", "Max Speed", "Parking Address"]} />
			<Table.Body
				data={data}
				render={render}/>
		</Table>
	);
}

TransportsTable.propTypes = {
	data: PropTypes.array.isRequired
};

export default TransportsTable;