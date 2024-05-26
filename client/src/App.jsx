import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

import SpinnerFullPage from './ui/SpinnerFullPage';

const AppLayout = lazy(() => import('./pages/AppLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Homepage = lazy(() => import('./pages/Homepage'));
const Orders = lazy(() => import('./pages/Orders'));
const Products = lazy(() => import('./pages/Products'));
const Transports = lazy(() => import('./pages/Transports'));
const Warehouses = lazy(() => import('./pages/Warehouses'));
const Maps = lazy(() => import('./pages/Maps'));
const NotFound = lazy(() => import('./pages/NotFound'));


function App() {

	return (
		<>
			<BrowserRouter>
				<Suspense fallback={<SpinnerFullPage />}>
					<Routes>
						<Route index element={<Homepage />} />
						<Route element={<AppLayout />}>
							<Route path="/app" element={<Dashboard />} />
							<Route path="/orders" element={<Orders />} />
							<Route path="/products" element={<Products />} />
							<Route path="/transports" element={<Transports />} />
							<Route path="/warehouses" element={<Warehouses />} />
							<Route path="/maps" element={<Maps />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</Suspense>
			</BrowserRouter>
			<Toaster />
		</>
	);
}

export default App;