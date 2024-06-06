import { PlusCircleFill } from "react-bootstrap-icons";
import { List, ListGroup, ListGroupItem } from "reactstrap";

function Warehouses(){
	return (
		<>
		<h1 className="h2">Warehouses</h1>
		<section className="section">
			<div className="row">
				<Sidebar />
			</div>
		</section>
		</>
	);
}

function Sidebar() {
	// const data = [];

	return (
		<aside className="w-25 h-100">
			<ListGroup flush>
				<ListGroupItem tag="button" data-bs-target="#warehouse1" data-bs-toggle="collapse">
					Warehouse 1
				</ListGroupItem>
				<div className="collapse" id="warehouse1">
					<List type="unstyled" className="ms-5">
						<li>Products</li>
						<li>Orders</li>
						<li>Transports</li>
					</List>
				</div>
				<ListGroupItem tag="button" data-bs-target="#warehouse2" data-bs-toggle="collapse">
					Warehouse 2
				</ListGroupItem>
				<div className="collapse" id="warehouse2">
					<List type="unstyled" className="ms-5">
						<li>Products</li>
						<li>Orders</li>
						<li>Transports</li>
					</List>
				</div>
				<ListGroupItem tag="button" color="info">Add Warehouse <PlusCircleFill /></ListGroupItem>
			</ListGroup>
		</aside>
	);
}

export default Warehouses;