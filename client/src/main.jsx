import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import store from './store';
import App from './App';

import 'bootstrap';
import './scss/styles.scss';


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store} />
		<App />
	</React.StrictMode>
);