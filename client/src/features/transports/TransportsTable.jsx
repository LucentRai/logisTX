import SpinnerFullPage from "../../ui/SpinnerFullPage";

import Table from "../../ui/Table";
import { useTransports } from "./useTransports";


function TransportsTable(){
	const {isLoading, transports} = useTransports();

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

export default TransportsTable;