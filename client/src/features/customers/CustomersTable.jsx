import { useQuery } from "@tanstack/react-query";

import Table from "../../ui/Table";
import { getCustomers } from "../../services/apiCustomers";
import SpinnerFullPage from "../../ui/SpinnerFullPage";


function CustomersTable(){
	const {
		data: {documents: customers} = {},
		isLoading
	} = useQuery({
		queryKey: ['customers'],
		queryFn: getCustomers
	});

	if(isLoading){
		return <SpinnerFullPage />;
	}

	function render(row){
		return (
			<>
				<td>{row.name}</td>
				<td>{row.phone}</td>
				<td>{row.address}</td>
				<td><p>Lat: {row.location[0]}<br />Lng: {row.location[1]}</p>{}</td>
			</>
		);
	}

	return (
		<Table>
			<Table.Head columns={["Name", "Phone", "Address", "Location"]} />
			<Table.Body
				data={customers}
				render={render}/>
		</Table>
	);
}


export default CustomersTable;