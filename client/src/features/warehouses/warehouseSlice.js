import { createSlice } from "@reduxjs/toolkit";
import { getWarehousesApi } from "../../services/apiWarehouses";


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
		const {documents: warehouses} = await getWarehousesApi();
		dispatch({type: 'warehouses/setWarehouses', payload: warehouses});
	};
}

export default warehouseSlice.reducer;