import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/users/userSlice";
import warehouseReducer from "./features/warehouses/warehouseSlice";


export default configureStore({
	reducer: {
		user: userReducer,
		warehouses: warehouseReducer,
	}
});