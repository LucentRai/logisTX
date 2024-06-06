import { PlusCircleFill } from "react-bootstrap-icons";
import { List, ListGroup, ListGroupItem } from "reactstrap";

function Sidebar() {
	// const data = [];

	return (
		<aside className="w-25 h-100">
			<ListGroup flush>
				<ListGroupItem tag="button" data-bs-target="#warehouse1" data-bs-toggle="collapse">
					Warehouse 1
					<List type="unstyled" className="collapse mt-2 ms-2 text-start" id="warehouse1">
						<li>Products: <strong>0</strong></li>
						<li>Orders: <strong>0</strong></li>
						<li>Transports: <strong>0</strong></li>
					</List>
				</ListGroupItem>
				<ListGroupItem tag="button" color="info">Add Warehouse <PlusCircleFill /></ListGroupItem>
			</ListGroup>
		</aside>
	);
}

export default Sidebar;