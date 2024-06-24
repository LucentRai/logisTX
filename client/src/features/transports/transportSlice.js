import { createSlice } from "@reduxjs/toolkit";
import { getTransportApi } from "../../services/apiTransports";


const transportSlice = createSlice({
	name: 'transports',
	initialState: [],
	reducers: {
		setWarehouses(state, action){
			state.length = 0;
			const transports = action.payload;
			transports.forEach(transport => {
				state.push(transport);
			});
		}
	}
});

export function getTransports(){
	return async function(dispatch){
		const {documents: transports} = await getTransportApi();
		dispatch({type: 'transports/setTransports', payload: transports});
	};
}

export default transportSlice.reducer;