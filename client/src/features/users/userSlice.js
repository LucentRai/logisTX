import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		_id: '',
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
		setUserInfo(state, action){
			const {_id, firstname, lastname, role, companyId, companyName, address, phone, email, photo} = action.payload;
			state._id = _id;
			state.firstname = firstname;
			state.lastname = lastname;
			state.role = role;
			state.company.id = companyId;
			state.company.name = companyName;
			state.company.address = address;
			state.phone = phone;
			state.email = email;
			state.photo = photo;
		}
	}
});

export const {setUserInfo} = userSlice.actions;
export default userSlice.reducer;