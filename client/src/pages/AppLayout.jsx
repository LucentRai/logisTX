import { Outlet } from 'react-router-dom';

import Header from '../ui/Header';
import Sidebar from '../ui/Sidebar';
import Footer from '../ui/Footer';

function AppLayout() {

	return (
		<>
			<Header />
			<div className="container-fluid">
				<div className="row">
					<Sidebar />
					<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
						<Outlet />
					</main>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default AppLayout;