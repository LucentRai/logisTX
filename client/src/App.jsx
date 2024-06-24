import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import SpinnerFullPage from './ui/SpinnerFullPage';
import axios from 'axios';

const AppLayout = lazy(() => import('./pages/AppLayout'));
const Customers = lazy(() => import('./pages/Customer'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Homepage = lazy(() => import('./pages/Homepage'));
const Orders = lazy(() => import('./pages/Orders'));
const Products = lazy(() => import('./pages/Products'));
const Transports = lazy(() => import('./pages/Transports'));
const Warehouses = lazy(() => import('./pages/Warehouses'));
const Maps = lazy(() => import('./pages/Maps'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 2, // 2 minutes
		}
	}
});

axios.defaults.baseURL = import.meta.env.VITE_API;

function App() {

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<BrowserRouter>
				<Suspense fallback={<SpinnerFullPage />}>
					<Routes>
						<Route index element={<Homepage />} />
						<Route element={<AppLayout />}>
							<Route path="/app" element={<Dashboard />} />
							<Route path="/customers" element={<Customers />} />
							<Route path="/orders" element={<Orders />} />
							<Route path="/products" element={<Products />} />
							<Route path="/transports" element={<Transports />} />
							<Route path="/warehouses" element={<Warehouses />} />
							<Route path="/maps" element={<Maps />} />
							<Route path="/maps/orders" element={<Maps />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</Suspense>
			</BrowserRouter>
			<Toaster />
		</QueryClientProvider>
	);
}

export default App;