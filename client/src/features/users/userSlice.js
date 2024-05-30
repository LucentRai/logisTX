import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		firstname: '',
		lastname: '',
		role: '',
		company: {
			id: '',
			name: '',
			address: ''
		},
		phone: '',
		email: '',
		photo: ''
	},
	reducers: {
		setUserInfo: (state, action) => {
			const {firstname, lastname, role, companyId, companyName, address, phone, email, photo} = action.payload;
			state.firstname = firstname;
			state.lastname = lastname;
			state.role = role;
			state.companyId = companyId;
			state.companyName = companyName;
			state.address = address;
			state.phone = phone;
			state.email = email;
			state.photo = photo;
		}
	}
});

export const {setUserInfo} = userSlice.actions;
export default userSlice.reducer;