import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllWarehouses } from "../../services/apiWarehouses";


export const fetchWarehouses = createAsyncThunk('warehouses/fetchWarehouses', getAllWarehouses);

const warehouseSlice = createSlice({
	name: 'warehouses',
	initialState: {
		_id: '',
		name: '',
		location: [],
		operatingHours: []
	},
	reducers: {
	},
	extraReducers: builder => {
		builder
			.addCase(fetchWarehouses.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchWarehouses.fulfilled, (state, action) => {
				const newEntities = {};
				action.payload.forEach(warehouse => {
					newEntities[warehouse._id] = warehouse;
				});
				state.entities = newEntities;
				state.status = 'idle';
			});
	}
});


export const {setWarehouseSlice} = warehouseSlice.actions;
export default warehouseSlice.reducer;