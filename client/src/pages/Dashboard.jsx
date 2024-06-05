import {BoxSeamFill, FilePersonFill, Truck} from "react-bootstrap-icons";
import {useSelector} from "react-redux";

import InfoCard from "../ui/InfoCard";

function Dashboard(){
	const {name} = useSelector(state => state.user.company);

	return (
		<>
			<h1 className="h2">{`${name} Dashboard`}</h1>
			<section className="section dashboard">
				<div className="row">

					{/*  Left side columns */}
					<div className="col-lg-8">
						<div className="row">
							<InfoCard href="/orders" icon={<BoxSeamFill />} iconStyle={{color: "#ff771d", background: "#ffe3c0"}} title="Orders" value="1234">
								<span className="text-success small pt-1 fw-bold">80%</span> <span>Fulfilled</span>
							</InfoCard>
							<InfoCard href="/transports"  icon={<Truck />} iconStyle={{color: "#4154f1", background: "#dce0ff"}}  title="Transports" value="12">
								<span className="text-success small pt-1 fw-bold">8</span> <span>delivering</span>
							</InfoCard>
							<InfoCard href="/employees"  icon={<FilePersonFill />} iconStyle={{color: "#2eca6a", background: "#d5ffde"}} title="Employees" value="1234" />
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