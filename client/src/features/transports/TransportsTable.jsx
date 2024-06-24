import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { getAllTransports } from "../../services/apiTransports";
import SpinnerFullPage from "../../ui/SpinnerFullPage";

import Table from "../../ui/Table";


function TransportsTable(){
	const {
		data: {documents: transports} = {},
		isLoading
	} = useQuery({
		queryKey: ['transports'],
		queryFn: getAllTransports
	});

	if(isLoading){
		return <SpinnerFullPage />;
	}

	function render(row){
		return (
			<>
				<td>{row.name}</td>
				<td>Truck</td>
				<td>{row.volume} m<sup>3</sup></td>
				<td>{row.maxCapacity} kg</td>
				<td>{row.maxSpeed} km/hr</td>
				<td>
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m1.6-5h14.8M3 12h18M4.6 17h14.8"/></svg> {row.parkingLocation[0]}<br />
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/><path d="M11.5 3a11.2 11.2 0 0 0 0 18m1-18a11.2 11.2 0 0 1 0 18M12 3v18"/></g></svg> {row.parkingLocation[1]}<br />
					</span>
				</td>
			</>
		);
	}

	return (
		<Table>
			<Table.Head columns={["Name", "Type", "Volume", "Max Capacity", "Max Speed", "Parking Address"]} />
			<Table.Body
				data={transports}
				render={render}/>
		</Table>
	);
}

TransportsTable.propTypes = {
	data: PropTypes.array.isRequired
};

export default TransportsTable;