import {BrowserRouter, Routes, Route} from "react-router-dom";
import { lazy } from 'react';
import { Toaster } from "react-hot-toast";

const AppLayout = lazy(() => import('./pages/AppLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Dashboard />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<Toaster />
		</>
	);
}

export default App;