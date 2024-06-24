import { createSlice } from "@reduxjs/toolkit";
import { getOrdersApi } from "../../services/apiOrders";


const warehouseSlice = createSlice({
	name: 'warehouses',
	initialState: [],
	reducers: {
		setWarehouses(state, action){
			state.length = 0;
			const warehouses = action.payload;
			warehouses.forEach(warehouse => {
				state.push(warehouse);
			});
		}
	}
});

export function getWarehouses(){
	return async function(dispatch){
		const {documents: warehouses} = await getOrdersApi();
		dispatch({type: 'warehouses/setWarehouses', payload: warehouses});
	};
}

export default warehouseSlice.reducer;