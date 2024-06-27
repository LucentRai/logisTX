import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders } from "../../services/apiOrders";


const orderSlice = createSlice({
	name: 'orders',
	initialState: [],
	reducers: {
		setOrders(state, action){
			state.length = 0;
			const orders = action.payload;
			orders.forEach(order => {
				state.push(order);
			});
		}
	}
});

export function getOrders(){
	return async function(dispatch){
		const {documents: orders} = await getAllOrders();
		dispatch({type: 'orders/setOrders', payload: orders});
	};
}

export default orderSlice.reducer;