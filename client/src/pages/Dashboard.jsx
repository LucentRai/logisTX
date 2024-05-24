import {BoxSeamFill, FilePersonFill, Truck} from "react-bootstrap-icons";
import InfoCard from "../ui/InfoCard";

function Dashboard(){
	return (
		<>
			<h1 className="h2">Dashboard</h1>
			<section className="section dashboard">
				<div className="row">

					{/*  Left side columns */}
					<div className="col-lg-8">
						<div className="row">
							<InfoCard title="Orders" value="1234" icon={<BoxSeamFill />} iconColor="fees-card" href="/orders">
								<span className="text-success small pt-1 fw-bold">80%</span> <span className="text-muted small pt-2 ps-1">Fulfilled</span>
							</InfoCard>
							<InfoCard title="Employees" value="1234" icon={<FilePersonFill />} iconColor="expense-card" href="/employees">
								<span className="text-success small pt-1 fw-bold">80%</span> <span className="text-muted small pt-2 ps-1">collected</span>
							</InfoCard>
							<InfoCard title="Transports" value="1234" icon={<Truck />} iconColor="employee-card" href="/employees" />

						</div>
					</div>
					{/*  End Left side columns */}

					{/*  Right side columns */}
					<div className="col-lg-4">
						<h2>right column</h2>
					</div>
					{/*  End Right side columns */}

				</div>
			</section>
		</>
	);
}

export default Dashboard;