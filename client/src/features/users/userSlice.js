import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		firstname: '',
		lastname: '',
		role: '',
		company: {
			id: '',
			name: ''
		},
		phone: '',
		email: '',
		photo: ''
	},
	reducers: {
		setUser: (state, action) => {
			const {firstname, lastname, role, companyId, companyName, phone, email, photo} = action.payload;
			state.firstname = firstname;
			state.lastname = lastname;
			state.role = role;
			state.companyId = companyId;
			state.companyName = companyName;
			state.phone = phone;
			state.email = email;
			state.photo = photo;
		}
	}
});

export default userSlice.reducer;