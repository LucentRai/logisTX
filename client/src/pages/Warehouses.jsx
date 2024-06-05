import {Button} from "reactstrap";

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
	return (
		<div className="flex-shrink-0 p-3" style={{width: '240px'}}>
			<a href="/" className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
				<span className="fs-5 fw-semibold">Collapsible</span>
			</a>
			<ul className="list-unstyled ps-0">
				<li className="mb-1">
					<Button className="btn-toggle d-inline-flex align-items-center rounded border-0" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
						Warehouse 1
					</Button>
					<div className="collapse show" id="home-collapse">
						<ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
							<li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Overview</a></li>
						</ul>
					</div>
				</li>
				<li className="border-top my-3"></li>
				<li className="mb-1">
					<button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed">
						Add Warehouse
					</button>
				</li>
			</ul>
		</div>
	);
}

export default Warehouses;