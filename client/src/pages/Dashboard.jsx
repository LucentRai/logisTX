import {BoxSeamFill, Building, FilePersonFill, Truck} from "react-bootstrap-icons";
import {useDispatch, useSelector} from "react-redux";

import InfoCard from "../ui/InfoCard";
import { useWarehouses } from "../features/warehouses/useWarehouses";
import { useEffect } from "react";
import { useTransports } from "../features/transports/useTransports";
import SpinnerFullPage from "../ui/SpinnerFullPage";

function Dashboard(){
	const companyName = useSelector(state => state.user.company.name);
	const {isLoading: isLoadingWarehouses, warehouses} = useWarehouses();
	const {isLoading: isLoadingTransports, transports} = useTransports();
	const dispatch = useDispatch();

	useEffect(() => {
		if(!isLoadingTransports){
			dispatch({type: 'transports/setTransports', payload: transports});
		}
		if(!isLoadingWarehouses){
			dispatch({type: 'warehouses/setWarehouses', payload: warehouses});
		}
	}, [dispatch, isLoadingTransports, isLoadingWarehouses, transports, warehouses]);

	if(isLoadingWarehouses || isLoadingTransports){
		return <SpinnerFullPage />;
	}

	return (
		<>
			<h1 className="h2">{`${companyName} Dashboard`}</h1>
			<section className="section dashboard">
				<div className="row">

					{/*  Left side columns */}
					<div className="col-lg-8">
						<div className="row">
							<InfoCard href="/orders" icon={<BoxSeamFill />} iconStyle={{color: "#ff771d", background: "#ffe3c0"}} title="Orders" value={1}>
								<span className="text-success small pt-1 fw-bold">80%</span> <span>Fulfilled</span>
							</InfoCard>
							<InfoCard href="/transports"  icon={<Truck />} iconStyle={{color: "#4154f1", background: "#dce0ff"}}  title="Transports" value={transports.length}>
								<span className="text-success small pt-1 fw-bold">8</span> <span>delivering</span>
							</InfoCard>
							<InfoCard href="/warehouses"  icon={<Building />} iconStyle={{color: "#9cf141", background: "#dce0ff"}}  title="Warehouses" value={warehouses.length} />
							<InfoCard href="/employees"  icon={<FilePersonFill />} iconStyle={{color: "#2eca6a", background: "#d5ffde"}} title="Employees" value={123} />
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