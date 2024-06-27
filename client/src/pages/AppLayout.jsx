import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from '../ui/Header';
import Sidebar from '../ui/Sidebar';
import Footer from '../ui/Footer';

import { getTransports } from "../features/transports/transportSlice";
import { getWarehouses } from "../features/warehouses/warehouseSlice";
import { setUserInfo } from '../features/users/userSlice';

function AppLayout() {
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('user'));
	dispatch(setUserInfo(user));
	dispatch(getTransports());
	dispatch(getWarehouses());

	return (
		<>
			<Header />
			<div className="container-fluid">
				<div className="row">
					<Sidebar />
					<main id="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
						<Outlet />
					</main>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default AppLayout;