import { PlusCircleFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";

import { useWarehouses } from "./useWarehouses";
import { useEffect } from "react";

function Sidebar() {
	const {isLoading, warehouses} = useWarehouses();
	const dispatch = useDispatch();

	useEffect(() => {
		if(warehouses){
			dispatch({type: 'warehouses/setWarehouses', payload: warehouses});
		}
	}, [dispatch, warehouses]);

	return (
		<aside className="col-2">
			<ListGroup flush>
				{isLoading ? <Spinner color="info" className="mt-2 ms-auto me-auto mb-4" />
					: warehouses && warehouses.map(warehouse => (
					<ListGroupItem key={warehouse._id} tag="button" data-bs-target={`#${warehouse._id}`} data-bs-toggle="collapse">
						{warehouse.name}
						{/* <List type="unstyled" className="collapse mt-2 ms-2 text-start" id={warehouse._id}>
							<li>Products: <strong>0</strong></li>
							<li>Orders: <strong>0</strong></li>
							<li>Transports: <strong>0</strong></li>
						</List> */}
					</ListGroupItem>
				))}
			<ListGroupItem tag="button" color="info">Add Warehouse <PlusCircleFill /></ListGroupItem>
			</ListGroup>
		</aside>
	);
}

export default Sidebar;