import PropTypes from "prop-types";
import { useReducer} from "react";
import toast from "react-hot-toast";

import { MAX_NAME_LENGTH, MIN_NAME_LENGTH, PHONE_REGEX } from "../../../../server/CONSTANTS";

const initialState = {
	showFeedback: false,
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
	errors: {}
};

function reducer(state, action){
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	switch (action.type){
		case 'getValue':
			return {
				...state,
				[action.inputName]: action.value
			};

		case 'validate':
			if(state.firstname.length < MIN_NAME_LENGTH || state.firstname.length > MAX_NAME_LENGTH){
				state.errors.firstname = `Firstname must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`;
			}
			else{
				delete state.errors.firstname;
			}

			if(state.lastname.length < MIN_NAME_LENGTH || state.lastname.length > MAX_NAME_LENGTH){
				state.errors.lastname = `Lastname must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`;
			}
			else{
				delete state.errors.lastname;
			}

			if(state.company.length < MIN_NAME_LENGTH || state.company.length > MAX_NAME_LENGTH){
				state.errors.company = `Company Name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`;
			}
			else{
				delete state.errors.company;
			}

			if(state.address.length < 4 || state.address.length > 100){
				state.errors.address = 'Address must be between 4 and 100 characters.';
			}
			else{
				delete state.errors.address;
			}

			if(!PHONE_REGEX.test(state.phone)){
				state.errors.phone = 'Invalid Phone Number';
			}
			else{
				delete state.errors.phone;
			}

			if(!emailRegex.test(state.email)){
				state.errors.email = 'Invalid Email Address';
			}
			else{
				delete state.errors.email;
			}

			if(state.password.length < 8){
				state.errors.password = 'Password must be at least 8 characters.';
			}
			else if(state.password !== state.password2){
				state.errors.password = 'Passwords do not match.';
			}
			else{
				delete state.errors.password;
			}

			return {
				...state,
				showFeedback: true,
			};

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

					<form className="modal-body row g-3 multi-collapse" id="registerForm" onSubmit={e => handleSubmit(e)}>
						<TextInput
							label="First Name"
							size={4}
							name="firstname"
							error={state.errors?.firstname}
							feedback={state.showFeedback} />
						<TextInput
							label="Middle Name"
							size={4}
							name="middlename"
							feedback={state.showFeedback}
							notRequired />
						<TextInput
							label="Last Name"
							size={4}
							name="lastname"
							error={state.errors?.lastname} feedback={state.showFeedback} />
						<TextInput
							label="Company Name"
							size={6}
							name="company"
							placeholder="Enter Company Name" error={state.errors?.company} feedback={state.showFeedback} />
						<TextInput
							label="Address"
							size={6}
							name="address"
							placeholder="Enter Company Address" error={state.errors?.address} feedback={state.showFeedback} />
						<TextInput
							label="Role"
							size={4}
							name="role"
							placeholder="Position in the Company" feedback={state.showFeedback} />
						<TextInput
							label="Phone Number"
							size={4}
							name="phone"
							placeholder="Contact Person Phone Number" error={state.errors?.phone} feedback={state.showFeedback} />
						<TextInput
							label="Email"
							size={4}
							name="email"
							placeholder="Company Email Address" type="email" error={state.errors?.email} feedback={state.showFeedback} />
						<TextInput
							label="Password"
							size={6}
							name="password"
							placeholder="Enter New Password" type="password" error={state.errors?.password} feedback={state.showFeedback} />
						<TextInput
						label="Confirm Password"
						size={6}
						name="password2"
						placeholder="Reenter Password" type="password" error={state.errors?.password} feedback={state.showFeedback} />
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

function TextInput({label, type, size, name, placeholder, notRequired, error, feedback}){
	const id = `sign-up-${name}`;
	// console.log(error);

	return (
		<div className={`col-md-${size}`}> {/* bootstrap col class size */}
			<label htmlFor={id} className="form-label">{label}</label>
			<input type={type ?? 'text'} className={`form-control ${feedback && error ? 'is-invalid' : 'is-valid}'}`} id={id} name={name} placeholder={placeholder} required={!notRequired} />
			<div className={`${feedback && error ? 'invalid-feedback' : 'valid-feedback'} d-block`} id={id}>
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
	notRequired: PropTypes.bool,
	error: PropTypes.string,
	feedback: PropTypes.bool
};

export default SignUpModal;