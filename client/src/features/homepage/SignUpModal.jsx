import PropTypes from "prop-types";
import { useReducer} from "react";
import toast from "react-hot-toast";

import { MAX_NAME_LENGTH, MIN_NAME_LENGTH, MAX_ADDRESS_LENGTH, MIN_ADDRESS_LENGTH, PHONE_REGEX } from "../../../../constants.json";
import axios from "axios";

const phoneRegexPattern = new RegExp(PHONE_REGEX);

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

	if(action.type !== 'validate') return state;

	if(action.type === 'setState'){
		console.log(state, action.values);
		return {
			...state,
			...action.values,
			showFeedback: true
		};
	}

	if(action.values.firstname.length < MIN_NAME_LENGTH || action.values.firstname.length > MAX_NAME_LENGTH){
		state.errors.firstname = `Firstname must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`;
	}
	else{
		delete state.errors.firstname;
	}

	if(action.values.lastname.length < MIN_NAME_LENGTH || action.values.lastname.length > MAX_NAME_LENGTH){
		state.errors.lastname = `Lastname must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`;
	}
	else{
		delete state.errors.lastname;
	}

	if(action.values.company.length < MIN_NAME_LENGTH || action.values.company.length > MAX_NAME_LENGTH){
		state.errors.company = `Company Name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`;
	}
	else{
		delete state.errors.company;
	}

	if(action.values.address.length < MIN_ADDRESS_LENGTH || action.values.address.length > MAX_ADDRESS_LENGTH){
		state.errors.address = `Address must be between ${MIN_ADDRESS_LENGTH} and ${MAX_ADDRESS_LENGTH} characters.`;
	}
	else{
		delete state.errors.address;
	}

	if(!phoneRegexPattern.test(action.values.phone)){
		state.errors.phone = 'Invalid Phone Number';
	}
	else{
		delete state.errors.phone;
	}

	if(!emailRegex.test(action.values.email)){
		state.errors.email = 'Invalid Email Address';
	}
	else{
		delete state.errors.email;
	}

	if(action.values.password.length < 8){
		state.errors.password = 'Password must be at least 8 characters.';
	}
	else if(action.values.password !== action.values.password2){
		state.errors.password = 'Passwords do not match.';
	}
	else{
		delete state.errors.password;
	}

	return {
		...state,
		...action.values,
		showFeedback: true,
	};
}


function SignUpModal(){
	const [state, dispatch] = useReducer(reducer, initialState);


	async function handleSubmit(e){
		e.preventDefault();
		const formData = new FormData(e.target);
		const formDataObject = Object.fromEntries(formData.entries());

		await dispatch({ type: 'validate', values: formDataObject});

		if(Object.keys(state.errors).length > 0){
			toast.error('Please correct the errors in the form.');
			return;
		}

		axios.post('/users/signup', {
			firstname: state.firstname,
			middlename: state.middlename,
			lastname: state.lastname,
			address: state.address,
			role: state.role,
			email: state.email,
			phone: state.phone,
			password: state.password,
			company: state.company
		})
		.then(res => {
			if(res.status === 201){
				toast.success('Sign Up Successful. Redirecting to Dashboard');
				setTimeout(() => {
					window.location.href = '/app';
				}, 1000);
			}
			else{
				toast.error('Something went wrong.');
			}
		})
		.catch(err => {
			console.error(err);
			if(err.response.status === 400){
				const message = err.response.data.message;
				if(message.includes('Email')){
					console.log('e');
					dispatch({type: 'set-state', values: {email: message}});
				}
				else if(message.includes('Phone')){
					console.log('p');
					dispatch({type: 'set-state', values: {phone: message}});
				}
				else if(message.includes('Company')){
					console.log('c');
					dispatch({type: 'setState', values: {company: message}});
				}
			}
			toast.error('Error: ' + err.message);
		});
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
							error={state.errors?.lastname}
							feedback={state.showFeedback} />
						<TextInput
							label="Company Name"
							size={6}
							name="company"
							placeholder="Enter Company Name"
							error={state.errors?.company}
							feedback={state.showFeedback} />
						<TextInput
							label="Address"
							size={6}
							name="address"
							placeholder="Enter Company Address"
							error={state.errors?.address}
							feedback={state.showFeedback} />
						<TextInput
							label="Role"
							size={4}
							name="role"
							placeholder="Position in the Company"
							feedback={state.showFeedback} />
						<TextInput
							label="Phone Number"
							size={4}
							name="phone"
							placeholder="Contact Person Phone Number"
							error={state.errors?.phone}
							feedback={state.showFeedback} />
						<TextInput
							label="Email"
							size={4}
							name="email"
							placeholder="Company Email Address"
							type="email"
							error={state.errors?.email}
							feedback={state.showFeedback} />
						<TextInput
							label="Password"
							size={6}
							name="password"
							placeholder="Enter New Password"
							type="password"
							error={state.errors?.password}
							feedback={state.showFeedback} />
						<TextInput
							label="Confirm Password"
							size={6}
							name="password2"
							placeholder="Reenter Password"
							type="password"
							error={state.errors?.password}
							feedback={state.showFeedback} />
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

	return (
		<div className={`col-md-${size}`}> {/* bootstrap col class size */}
			<label htmlFor={id} className="form-label">{label}</label>
			<input
				type={type ?? 'text'}
				className={`form-control ${feedback ? (error ? 'is-invalid' : 'is-valid') : ''}`}
				id={id}
				name={name}
				placeholder={placeholder}
				required={!notRequired} />
			<div className={`${feedback && error ? 'invalid-feedback' : 'valid-feedback'} d-block`} id={id}>
				{feedback ? error ?? 'Looks good!' : ''}
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