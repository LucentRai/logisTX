import { configureStore } from "@reduxjs/toolkit";

import orderReducer from "./features/orders/orderSlice";
import transportReducer from "./features/transports/transportSlice";
import userReducer from "./features/users/userSlice";
import warehouseReducer from "./features/warehouses/warehouseSlice";


export default configureStore({
	reducer: {
		orders: orderReducer,
		transports: transportReducer,
		user: userReducer,
		warehouses: warehouseReducer,
	}
});