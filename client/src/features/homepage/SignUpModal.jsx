import PropTypes from "prop-types";
import { useReducer} from "react";
import toast from "react-hot-toast";

const initialState = {
	firstname: '',
	middlename: '',
	lastname: '',
	company: '',
	address: '',
	role: '',
	phone: '',
	email: '',
	password: '',
	password2: '',
	errors: {},
	valid: []
};

function reducer(state, action){
	const phoneRegex = /^[+-]?\d{10,13}$/	;
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	switch (action.type){
		case 'getValue':
			return {
				...state,
				[action.inputName]: action.value
			};

		case 'validate':
			if(state.firstname.length < 3 || state.firstname.length > 30){
				state.errors.firstname = 'Firstname must be between 3 and 30 characters.';
			}
			else{
				state.valid.push('firstname');
			}

			if(state.lastname.length < 3 || state.lastname.length > 30){
				state.errors.lastname = 'Lastname must be between 3 and 30 characters.';
			}
			else{
				state.valid.push('lastname');
			}

			if(state.company.length < 3 || state.company.length > 30){
				state.errors.company = 'Company Name must be between 3 and 30 characters.';
			}
			else{
				state.valid.push('company');
			}

			if(state.address.length < 4 || state.address.length > 100){
				state.errors.address = 'Address must be between 4 and 100 characters.';
			}
			else{
				state.valid.push('address');
			}

			if(phoneRegex.test(state.phone)){
				state.valid.push('phone');
			}
			else{
				state.errors.phone = 'Invalid Phone Number';
			}

			if(emailRegex.test(state.email)){
				state.valid.push('email');
			}
			else{
				state.errors.email = 'Invalid Email Address';
			}

			if(state.password.length < 8){
				state.errors.password = 'Password must be at least 8 characters.';
			}
			else if(state.password !== state.password2){
				state.errors.password = 'Passwords do not match.';
			}
			else{
				state.valid.push('password');
			}

			return {...state};

		default:
			return state;
	}
}


function SignUpModal(){
	const [state, dispatch] = useReducer(reducer, initialState);


	function handleSubmit(e){
		e.preventDefault();
		const formData = new FormData(e.target);
		const formDataObject = Object.fromEntries(formData.entries());

		for(let name in formDataObject){
			dispatch({ type: 'getValue', inputName: name, value: formDataObject[name] });
		}

		dispatch({ type: 'validate' });

		if(Object.keys(state.errors).length > 0){
			toast.error('Please correct the errors in the form.');
			return;
		}
		// fetch('/api/v1/users/signup', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		firstname: state.firstname,
		// 		middlename: state.middlename,
		// 		lastname: state.lastname,
		// 		address: state.address,
		// 		role: state.role,
		// 		email: state.email,
		// 		phone: state.phone,
		// 		password: state.password,
		// 		company: state.company
		// 	})
		// })
		// .then(res => {
		// 	if(res.ok){
		// 		toast.success('Sign Up Successful. Redirecting to Dashboard');
		// 		setTimeout(() => {
		// 			window.location.href = '/app';
		// 		}, 1000);
		// 	}
		// 	else{
		// 		console.log(res);
		// 		toast.error('Something went wrong.');
		// 	}
		// })
		// .catch(err => {
		// 	toast.error('Error: ' + err.message);
		// });
	}

	return (
		<div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-xl">
				<div className="modal-content">

					<div className="modal-header">
						<h1 className="modal-title" id="registerModalLabel">Sign Up</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>

					<form className="modal-body row g-3 multi-collapse needs-validation" id="registerForm" onSubmit={e => handleSubmit(e)}>
						<TextInput label="Firstname" size={4} name="firstname" required error={state.error?.firstname} />
						<TextInput label="Middle Name (Optional)" size={4} name="middlename" />
						<TextInput label="Lastname" size={4} name="lastname" required error={state.error?.lastname} />
						<TextInput label="Company Name" size={6} name="company" placeholder="Enter Company Name" required error={state.error?.company} />
						<TextInput label="Address" size={6} name="address" placeholder="Enter Company Address" required error={state.error?.address} />
						<TextInput label="Role" size={4} name="role" placeholder="Position in the Company" required />
						<TextInput label="Phone Number" size={4} name="phone" placeholder="Contact Person Phone Number" required error={state.error?.phone} />
						<TextInput label="Email" size={4} name="email" placeholder="Company Email Address" type="email" required error={state.error?.email} />
						<TextInput label="Password" size={6} name="password" placeholder="Enter New Password" type="password" required error={state.error?.password} />
						<TextInput label="Confirm Password" size={6} name="password2" placeholder="Reenter Password" type="password" required />
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="submit" className="btn btn-primary">Sign Up</button>
						</div>
					</form>

				</div>
			</div>
		</div>
	);
}

function TextInput({label, type, size, name, placeholder, required, error}){
	return (
		<div className={`col-md-${size}`}> {/* bootstrap col class size */}
			<label htmlFor={name} className="form-label">{label}</label>
			<input type={type ?? 'text'} className={`form-control ${error ? 'is-invalid' : 'is-valid}'}`} id={name} name={name} placeholder={placeholder} required={required} />
			<div className={error ? 'invalid-feedback' : 'valid-feedback'}>
				{error ?? 'Looks good!'}
			</div>
		</div>
	);
}

TextInput.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	size: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	error: PropTypes.string
};

export default SignUpModal;