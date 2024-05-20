import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

import SpinnerFullPage from './ui/SpinnerFullPage';

const AppLayout = lazy(() => import('./pages/AppLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Homepage = lazy(() => import('./pages/Homepage'));
const Maps = lazy(() => import('./pages/Maps'));


function App() {

	return (
		<>
			<BrowserRouter>
				<Suspense fallback={<SpinnerFullPage />}>
					<Routes>
						<Route index element={<Homepage />} />
						<Route element={<AppLayout />}>
							<Route path="/app" element={<Dashboard />} />
							<Route path="/maps" element={<Maps />} />
							<Route path="*" element={<h1>Not Found</h1>} />
						</Route>
					</Routes>
				</Suspense>
			</BrowserRouter>
			<Toaster />
		</>
	);
}

export default App;