import {BrowserRouter, Routes, Route} from "react-router-dom";
import { lazy } from 'react';
import { Toaster } from "react-hot-toast";
import Maps from "./pages/Maps";

const AppLayout = lazy(() => import('./pages/AppLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="/maps" element={<Maps />} />
						<Route path="*" element={<h1>Not Found</h1>} />
					</Route>
				</Routes>
			</BrowserRouter>
			<Toaster />
		</>
	);
}

export default App;